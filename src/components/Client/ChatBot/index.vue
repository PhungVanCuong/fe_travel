<template>
    <div class="chat-widget-container">
        <!-- Lời chào tự động khi chưa mở chat -->
        <transition name="fade">
            <div v-if="!isOpen && showWelcome" class="welcome-tooltip shadow-lg">
                👋 Chào mừng đến với Ixtal Tour! <br /> Bạn muốn tìm tour, tám chuyện hay xem lịch sử?
                <button class="close-welcome" @click.stop="showWelcome = false">×</button>
            </div>
        </transition>

        <!-- Nút bật/tắt Chatbot -->
        <div class="chat-toggle shadow-lg" @click="toggleChat" :class="{ 'is-open': isOpen }">
            <i v-if="!isOpen" class="fa-solid fa-headset"></i>
            <i v-else class="fa-solid fa-xmark"></i>
        </div>

        <!-- Khung Chat -->
        <transition name="fade-slide">
            <div v-show="isOpen" class="chat-box shadow-lg">
                
                <!-- Nút Đóng Chat nằm lơ lửng -->
                <button class="floating-close-btn" @click="toggleChat"><i class="fa-solid fa-chevron-down"></i></button>

                <!-- Lịch sử tin nhắn -->
                <div class="chat-messages" ref="messagesContainer">
                    <div v-for="(msg, index) in messages" :key="index" class="msg-wrapper"
                        :class="msg.from === 'user' ? 'is-user' : 'is-bot'">
                        
                        <!-- Avatar Bot -->
                        <div v-if="msg.from === 'bot'" class="bot-avatar me-2 shadow-sm">
                            <i class="fa-solid fa-plane"></i>
                        </div>

                        <div class="msg-content-wrapper">
                            <!-- Nhãn AI -->
                            <div v-if="msg.from === 'bot' && msg.ai_powered" class="ai-badge mb-1">
                                <i class="fa-solid fa-wand-magic-sparkles text-warning"></i> AI Assistant
                            </div>

                            <!-- Văn bản chat (Dùng v-html vì AI trả về thẻ <br> <b>) -->
                            <div class="msg-bubble shadow-sm" v-html="msg.text"></div>

                            <!-- Nút bấm (nếu có) -->
                            <div v-if="msg.buttons && msg.buttons.length > 0" class="msg-buttons">
                                <button v-for="(btn, bIndex) in msg.buttons" :key="bIndex"
                                        @click="handleButton(btn)" class="bot-action-btn shadow-sm">
                                    {{ btn.text }}
                                </button>
                            </div>

                            <!-- Danh sách Tour AI gợi ý -->
                            <div v-if="msg.tours && msg.tours.length > 0" class="tour-cards-container">
                                <div v-for="(tour, tIndex) in msg.tours" :key="tIndex" 
                                     @click="viewTour(tour.id)" class="chat-tour-card shadow-sm">
                                    <img :src="tour.hinh_anh" alt="Tour" class="tour-img">
                                    <div class="tour-info">
                                        <h6 class="tour-title">{{ tour.ten_tour }}</h6>
                                        <div class="tour-meta">
                                            <span>⭐ {{ tour.avg_sao ? Number(tour.avg_sao).toFixed(1) : 'Mới' }}</span>
                                            <span class="ms-2">📍 {{ tour.diem_don }}</span>
                                        </div>
                                        <div class="tour-price">{{ formatVND(tour.gia) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Hiệu ứng đang gõ -->
                    <div v-if="isTyping" class="msg-wrapper is-bot mt-2">
                        <div class="bot-avatar me-2 shadow-sm"><i class="fa-solid fa-plane"></i></div>
                        <div class="typing-indicator msg-bubble shadow-sm">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>

                <!-- Gợi ý nhanh (Có thể kéo thả bằng chuột) -->
                <div class="quick-actions-bar" 
                     ref="quickActionsBar"
                     @mousedown="startDrag"
                     @mouseleave="stopDrag"
                     @mouseup="stopDrag"
                     @mousemove="doDrag">
                    <button v-for="(action, index) in quickActions" :key="index"
                            @click="sendMessageDirect(action.message)"
                            :disabled="isTyping" class="quick-action-btn shadow-sm">
                        {{ action.label }}
                    </button>
                </div>

                <!-- Ô nhập liệu -->
                <div class="chat-input">
                    <input type="text" v-model="inputText" @keypress.enter="sendMessage"
                        placeholder="Trò chuyện hoặc tìm tour..." autocomplete="off" :disabled="isTyping" />
                    <button class="send-btn shadow-sm" @click="sendMessage" :disabled="!inputText.trim() || isTyping">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from "axios";
import apiUrl from "../../../utils/api";

export default {
    name: "ChatWidget",
    data() {
        return {
            isOpen: false,
            showWelcome: true,
            inputText: "",
            isTyping: false,
            messages: [],
            quickActions: [
                { label: "🔥 Tour hot nhất", message: "tour nào đang bán chạy nhất?" },
                { label: "🏔️ Đi Sapa", message: "Có tour đi Sapa nào không?" },
                { label: "🌸 Đi Đà Lạt", message: "Có tour đi Đà Lạt nào không?" },
                { label: "🌊 Tour Biển", message: "Tìm các tour du lịch biển" },
                { label: "🍁 Tour Miền Bắc", message: "Cho tôi xem tour Miền Bắc" },
                { label: "🏮 Tour Miền Trung", message: "Các tour Miền Trung như Đà Nẵng, Hội An" },
                { label: "🛶 Tour Miền Tây", message: "Tôi muốn đi tour Miền Nam, Miền Tây" },
                { label: "✈️ Đi Nước Ngoài", message: "Tôi muốn đi tour nước ngoài" },
                { label: "📦 Lịch sử Hóa đơn", message: "Tôi muốn xem lại các hóa đơn và lịch sử đặt tour" },
                { label: "👨‍🏫 Hướng dẫn viên", message: "Cho tôi thông tin về hướng dẫn viên của công ty" },
                { label: "💰 Rẻ dưới 2 triệu", message: "Tìm tour giá rẻ dưới 2 triệu" },
            ],
            // Variables for Drag-to-Scroll
            isDragging: false,
            startX: 0,
            scrollLeft: 0
        };
    },
    mounted() {
        setTimeout(() => {
            this.showWelcome = false;
        }, 10000);
    },
    watch: {
        isOpen(newVal) {
            if (newVal && this.messages.length === 0) {
                this.sendWelcomeMessage();
            }
        }
    },
    methods: {
        startDrag(e) {
            this.isDragging = true;
            this.startX = e.pageX - this.$refs.quickActionsBar.offsetLeft;
            this.scrollLeft = this.$refs.quickActionsBar.scrollLeft;
            this.$refs.quickActionsBar.style.cursor = 'grabbing';
        },
        stopDrag() {
            this.isDragging = false;
            if(this.$refs.quickActionsBar) {
                this.$refs.quickActionsBar.style.cursor = 'grab';
            }
        },
        doDrag(e) {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.$refs.quickActionsBar.offsetLeft;
            const walk = (x - this.startX) * 1.5; // Tốc độ trượt
            this.$refs.quickActionsBar.scrollLeft = this.scrollLeft - walk;
        },
        toggleChat() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) this.showWelcome = false;
            this.scrollToBottom();
        },
        clearChat() {
            this.messages = [];
            this.sendWelcomeMessage();
        },
        sendWelcomeMessage() {
            let userName = '';
            try {
                const userRaw = localStorage.getItem('khach_hang_login');
                if (userRaw) {
                    const parsed = JSON.parse(userRaw);
                    userName = parsed.ho_va_ten || parsed.ho_ten || '';
                }
            } catch (e) {}

            const greeting = userName
                ? `👋 Chào <strong>${userName}</strong>!<br/>Mình là Trợ lý AI siêu cấp vui tính của Ixtal Tour đây! Cần tìm tour, kiểm tra hóa đơn hay hỏi thông tin hướng dẫn viên cứ nhắn mình nha! 🍯`
                : `👋 Xin chào! Mình là Trợ lý AI của Ixtal Tour ✈️<br/>Bạn muốn đi đâu? Hãy gõ từ khóa hoặc chọn gợi ý bên dưới (kéo qua lại để xem thêm) nhé!`;

            this.messages.push({
                from: 'bot',
                text: greeting,
                buttons: userName ? null : [
                    { text: '🔐 Đăng nhập để xem lịch sử', type: 'route', route: '/client/dang-nhap' },
                ]
            });
            this.scrollToBottom();
        },
        formatVND(value) {
            if (!value) return "0 ₫";
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        viewTour(id) {
            this.isOpen = false;
            this.$router.push(`/client/chi-tiet-tour/${id}`);
        },
        handleButton(btn) {
            if (btn.type === 'route') {
                this.isOpen = false;
                this.$router.push(btn.route);
            } else if (btn.type === 'message') {
                this.sendMessageDirect(btn.message);
            }
        },
        sendMessageDirect(msg) {
            if (!msg || this.isTyping) return;
            this.inputText = msg;
            this.sendMessage();
        },
        async sendMessage() {
            const text = this.inputText.trim();
            if (!text || this.isTyping) return;

            // Đẩy câu hỏi user lên UI
            this.messages.push({ from: "user", text: text });
            this.inputText = "";
            this.isTyping = true;
            this.scrollToBottom();

            try {
                // Gọi API Laravel kết nối AI
                const response = await axios.post(apiUrl("client/chatbot/chat"), { message: text }, {
                    headers: { Authorization: "Bearer " + localStorage.getItem('key_client') }
                });
                
                if (response.data.status) {
                    this.messages.push({
                        from: "bot",
                        text: response.data.response,
                        tours: response.data.tours,
                        buttons: response.data.buttons,
                        ai_powered: response.data.ai_powered
                    });
                }
            } catch (error) {
                this.messages.push({
                    from: "bot",
                    text: "😅 Đứt cáp quang rồi! Hệ thống đang bận quá, bạn thử hỏi lại sau xíu nhé!"
                });
            } finally {
                this.isTyping = false;
                this.scrollToBottom();
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const el = this.$refs.messagesContainer;
                if (el) {
                    el.scrollTop = el.scrollHeight;
                }
            });
        }
    }
};
</script>

<style scoped>
.chat-widget-container { position: fixed; bottom: 30px; right: 30px; z-index: 999999; font-family: 'Roboto', sans-serif; display: flex; flex-direction: column; align-items: flex-end; }
.welcome-tooltip { position: absolute; bottom: 85px; right: 10px; background: #fff; color: #005baa; padding: 12px 35px 12px 15px; border-radius: 12px; font-size: 14px; font-weight: 500; line-height: 1.5; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); border: 2px solid #005baa; width: max-content; animation: bounce 2s infinite; }
.welcome-tooltip::after { content: ''; position: absolute; bottom: -8px; right: 20px; border-width: 8px 8px 0; border-style: solid; border-color: #005baa transparent transparent transparent; }
.close-welcome { position: absolute; top: 5px; right: 8px; background: none; border: none; color: #888; font-size: 18px; cursor: pointer; line-height: 1; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.chat-toggle { width: 65px; height: 65px; border-radius: 50%; background: linear-gradient(135deg, #005baa 0%, #00c6ff 100%); color: #fff; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: all 0.3s ease; font-size: 28px; border: 3px solid #fff; }
.chat-toggle:hover { transform: scale(1.1) translateY(-5px); }
.chat-toggle.is-open { background: #ff4b2b; border-color: #ff416c; transform: scale(0.9); }
.chat-box { width: 390px; height: 600px; background: #ffffff; border-radius: 20px; display: flex; flex-direction: column; overflow: hidden; position: absolute; bottom: 85px; right: 0; box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important; }
.floating-close-btn { position: absolute; top: 15px; right: 15px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); border: none; color: #555; z-index: 10; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: 0.3s; }
.floating-close-btn:hover { background: #ff4b2b; color: white; }
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: bottom right; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: scale(0.8) translateY(30px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.chat-messages { flex: 1; padding: 40px 20px 20px 20px; overflow-y: auto; background: url('https://www.transparenttextures.com/patterns/cubes.png'), linear-gradient(180deg, #f0f8ff 0%, #e6f2ff 100%); display: flex; flex-direction: column; gap: 16px; scroll-behavior: smooth; }
.chat-messages::-webkit-scrollbar { width: 5px; }
.chat-messages::-webkit-scrollbar-thumb { background-color: #b6c2d1; border-radius: 10px; }
.msg-wrapper { display: flex; width: 100%; align-items: flex-end; }
.is-user { justify-content: flex-end; }
.is-bot { justify-content: flex-start; }
.bot-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #005baa, #00c6ff); color: white; display: flex; justify-content: center; align-items: center; font-size: 14px; margin-bottom: 5px; }
.msg-content-wrapper { max-width: 85%; }
.msg-bubble { border-radius: 18px; padding: 12px 16px; line-height: 1.5; font-size: 14.5px; word-wrap: break-word; }
.is-user .msg-bubble { background: linear-gradient(135deg, #005baa, #00c6ff); color: white; border-bottom-right-radius: 4px; }
.is-bot .msg-bubble { background: white; border: 1px solid #e9ecef; color: #333; border-bottom-left-radius: 4px; }
.ai-badge { font-size: 11px; color: #888; font-weight: bold; margin-bottom: 4px; }
.typing-indicator span { display: inline-block; width: 6px; height: 6px; background-color: #005baa; border-radius: 50%; margin: 0 2px; animation: typing 1.4s infinite ease-in-out both; }
.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
@keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
.msg-buttons { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
.bot-action-btn { background: #fff; color: #005baa; border: 1px solid #005baa; border-radius: 12px; padding: 8px 12px; font-weight: 600; text-align: center; cursor: pointer; transition: 0.2s; }
.bot-action-btn:hover { background: #005baa; color: white; }
.tour-cards-container { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
.chat-tour-card { display: flex; background: white; border: 1px solid #e9ecef; border-radius: 12px; padding: 8px; cursor: pointer; transition: 0.2s; }
.chat-tour-card:hover { border-color: #005baa; box-shadow: 0 5px 15px rgba(0,91,186,0.1) !important; transform: translateY(-2px); }
.tour-img { width: 65px; height: 65px; border-radius: 8px; object-fit: cover; margin-right: 12px; }
.tour-info { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center;}
.tour-title { font-size: 13px; font-weight: bold; margin: 0 0 5px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #333; }
.tour-meta { font-size: 11px; color: #6c757d; margin-bottom: 5px; font-weight: 500;}
.tour-price { font-size: 13px; color: #ff4b2b; font-weight: bold; }
.quick-actions-bar { display: flex; gap: 8px; padding: 12px 15px; overflow-x: auto; background: white; border-top: 1px solid #f1f1f1; scrollbar-width: none; cursor: grab; }
.quick-actions-bar:active { cursor: grabbing; }
.quick-actions-bar::-webkit-scrollbar { display: none; }
.quick-action-btn { white-space: nowrap; padding: 7px 14px; border-radius: 20px; border: 1px solid #e0e0e0; background: #f8f9fa; color: #444; font-size: 12.5px; font-weight: 500; cursor: pointer; transition: 0.2s; user-select: none; }
.quick-action-btn:hover { background: #005baa; color: white; border-color: #005baa; }
.chat-input { display: flex; gap: 10px; padding: 15px; background: white; border-top: 1px solid #f1f1f1; }
.chat-input input { flex: 1; background: #f1f3f5; border: 1px solid transparent; border-radius: 20px; padding: 12px 18px; outline: none; font-size: 14.5px; transition: 0.3s; }
.chat-input input:focus { background: white; border-color: #005baa; box-shadow: 0 0 0 3px rgba(0, 91, 186, 0.1); }
.send-btn { width: 45px; height: 45px; border: none; border-radius: 50%; background: linear-gradient(135deg, #005baa, #00c6ff); color: white; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: 0.2s; }
.send-btn:hover:not(:disabled) { transform: scale(1.05); }
.send-btn:disabled { background: #ccc; cursor: not-allowed; }
</style>