// Simply More Detail - AI Booking Bot with Auto-Open
// Add this to your index.html: <script src="smd-chatbot.js"></script>

(function() {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
        #smd-chat-btn {
            position: fixed;
            bottom: 28px;
            right: 28px;
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #FF6B6B 0%, #E85555 100%);
            border-radius: 50%;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 30px rgba(255, 107, 107, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: pulse-smd 3s infinite;
        }
        
        @keyframes pulse-smd {
            0%, 100% {
                box-shadow: 0 8px 30px rgba(255, 107, 107, 0.4), 0 0 0 0 rgba(255, 107, 107, 0.5);
            }
            50% {
                box-shadow: 0 8px 30px rgba(255, 107, 107, 0.4), 0 0 0 15px rgba(255, 107, 107, 0);
            }
        }
        
        #smd-chat-btn:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 12px 40px rgba(255, 107, 107, 0.5);
        }
        
        #smd-chat-btn svg {
            width: 34px;
            height: 34px;
            fill: white;
        }
        
        #smd-chat-container {
            position: fixed;
            bottom: 120px;
            right: 28px;
            width: 400px;
            max-width: calc(100vw - 56px);
            height: 650px;
            max-height: calc(100vh - 160px);
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(26, 26, 26, 0.15);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 99998;
            animation: slideUp-smd 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        @keyframes slideUp-smd {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        #smd-chat-container.active {
            display: flex;
        }
        
        .smd-header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: white;
            padding: 28px 24px;
            position: relative;
            overflow: hidden;
        }
        
        .smd-header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .smd-brand {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 6px;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
        }
        
        .smd-tag {
            font-size: 16px;
            opacity: 1;
            font-weight: 600;
            position: relative;
            z-index: 1;
            color: #FF6B6B;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .smd-close {
            position: absolute;
            top: 24px;
            right: 24px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            z-index: 2;
            color: white;
            font-size: 24px;
            line-height: 1;
        }
        
        .smd-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
        
        .smd-messages {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            background: #fafafa;
        }
        
        .smd-msg {
            display: flex;
            gap: 12px;
            animation: fadeSlide-smd 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes fadeSlide-smd {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .smd-msg.bot .smd-avatar {
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, #FF6B6B 0%, #E85555 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.25);
        }
        
        .smd-msg.bot .smd-avatar svg {
            width: 22px;
            height: 22px;
            fill: white;
        }
        
        .smd-content {
            background: white;
            padding: 16px 18px;
            border-radius: 18px;
            max-width: 75%;
            font-size: 15px;
            line-height: 1.6;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .smd-msg.user {
            flex-direction: row-reverse;
        }
        
        .smd-msg.user .smd-content {
            background: linear-gradient(135deg, #FF6B6B 0%, #E85555 100%);
            color: white;
            margin-left: auto;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.25);
        }
        
        .smd-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 14px;
        }
        
        .smd-opt {
            background: white;
            border: 2px solid #e0e0e0;
            padding: 14px 16px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: center;
            font-family: inherit;
            color: #2d2d2d;
        }
        
        .smd-opt:hover {
            border-color: #FF6B6B;
            background: linear-gradient(135deg, #FF6B6B 0%, #E85555 100%);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }
        
        .smd-opt.full {
            grid-column: 1 / -1;
        }
        
        .smd-input-area {
            padding: 20px 24px;
            border-top: 1px solid #e0e0e0;
            display: none;
            gap: 12px;
            background: white;
        }
        
        .smd-input-area.active {
            display: flex;
        }
        
        .smd-input-area input {
            flex: 1;
            padding: 14px 18px;
            border: 2px solid #e0e0e0;
            border-radius: 14px;
            font-size: 15px;
            font-family: inherit;
            outline: none;
            transition: all 0.2s;
        }
        
        .smd-input-area input:focus {
            border-color: #FF6B6B;
            background: #fff;
        }
        
        .smd-input-area button {
            background: linear-gradient(135deg, #FF6B6B 0%, #E85555 100%);
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 14px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }
        
        .smd-input-area button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(255, 107, 107, 0.4);
        }
        
        .smd-input-area button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        @media (max-width: 480px) {
            #smd-chat-container {
                width: calc(100vw - 32px);
                right: 16px;
                bottom: 105px;
            }
            
            #smd-chat-btn {
                right: 16px;
                bottom: 16px;
                width: 65px;
                height: 65px;
            }
            
            .smd-options {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);

    // Inject HTML
    const chatHTML = `
        <button id="smd-chat-btn" aria-label="Book now">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
            </svg>
        </button>

        <div id="smd-chat-container">
            <div class="smd-header">
                <button class="smd-close" id="smd-close">×</button>
                <div class="smd-brand">Simply More Detail</div>
                <div class="smd-tag">Book Now in 1 Minute</div>
            </div>
            <div class="smd-messages" id="smd-msgs"></div>
            <div class="smd-input-area" id="smd-input">
                <input type="text" id="smd-user-input" placeholder="Type here..." />
                <button id="smd-send">Send</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // Chat functionality
    let state = {
        step: 'initial',
        data: {},
        hasAutoOpened: false
    };

    const chatBtn = document.getElementById('smd-chat-btn');
    const chatContainer = document.getElementById('smd-chat-container');
    const closeBtn = document.getElementById('smd-close');
    const messagesDiv = document.getElementById('smd-msgs');
    const userInput = document.getElementById('smd-user-input');
    const sendBtn = document.getElementById('smd-send');
    const inputArea = document.getElementById('smd-input');

    // Auto-open chat after 2 seconds
    setTimeout(() => {
        if (!state.hasAutoOpened) {
            chatContainer.classList.add('active');
            state.hasAutoOpened = true;
            setTimeout(startConversation, 600);
        }
    }, 2000);

    chatBtn.addEventListener('click', () => {
        chatContainer.classList.add('active');
        if (state.step === 'initial' && !state.hasAutoOpened) {
            state.hasAutoOpened = true;
            setTimeout(startConversation, 400);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    function addMessage(text, isBot = true, options = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `smd-msg ${isBot ? 'bot' : 'user'}`;
        
        if (isBot) {
            messageDiv.innerHTML = `
                <div class="smd-avatar">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="smd-content">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `<div class="smd-content">${text}</div>`;
        }

        messagesDiv.appendChild(messageDiv);
        
        if (options) {
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'smd-options';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'smd-opt' + (opt.fullWidth ? ' full' : '');
                btn.textContent = opt.text;
                btn.onclick = () => opt.action();
                optionsDiv.appendChild(btn);
            });
            messageDiv.querySelector('.smd-content').appendChild(optionsDiv);
        }

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function startConversation() {
        state.step = 'service';
        setTimeout(() => {
            addMessage("Hey! 👋 Ready to book your detail? What service do you need?");
            setTimeout(askService, 600);
        }, 800);
    }

    function askService() {
        addMessage("Pick one:", true, [
            { text: "Wash & Wax", action: () => selectService("Wash & Wax") },
            { text: "Full Detail", action: () => selectService("Full Detail") },
            { text: "Ceramic Coating", action: () => selectService("Ceramic Coating") },
            { text: "Not Sure Yet", action: () => selectService("Not Sure"), fullWidth: true }
        ]);
    }

    function selectService(service) {
        state.data.service = service;
        addMessage(service, false);
        state.step = 'location';
        setTimeout(askLocation, 700);
    }

    function askLocation() {
        setTimeout(() => {
            addMessage("Perfect! Where's your vehicle located?");
            setTimeout(() => {
                addMessage("We service:", true, [
                    { text: "Broward County", action: () => selectLocation("Broward") },
                    { text: "Miami-Dade", action: () => selectLocation("Miami") },
                    { text: "West Palm Beach", action: () => selectLocation("WPB") },
                    { text: "Outside These Areas", action: () => selectLocation("Outside"), fullWidth: true }
                ]);
            }, 600);
        }, 500);
    }

    function selectLocation(location) {
        const locationText = {
            "Broward": "Broward County",
            "Miami": "Miami-Dade",
            "WPB": "West Palm Beach",
            "Outside": "Outside service area"
        };
        
        state.data.location = location;
        addMessage(locationText[location], false);
        
        if (location === "Outside") {
            setTimeout(() => {
                addMessage("We don't service that area yet, but we're expanding soon! Leave your info and we'll let you know when we launch there.");
                setTimeout(askPhone, 600);
            }, 700);
        } else {
            state.step = 'phone';
            setTimeout(askPhone, 700);
        }
    }

    function askPhone() {
        setTimeout(() => {
            addMessage("Awesome! What's your phone number?");
            userInput.placeholder = "Enter phone number...";
            inputArea.classList.add('active');
            userInput.focus();
        }, 500);
    }

    function askName() {
        setTimeout(() => {
            addMessage("Perfect! And what's your name?");
            userInput.placeholder = "Enter your name...";
            inputArea.classList.add('active');
            userInput.focus();
        }, 500);
    }

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        if (state.step === 'phone') {
            const phoneRegex = /(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})/;
            if (phoneRegex.test(message)) {
                addMessage(message, false);
                state.data.phone = message;
                userInput.value = '';
                inputArea.classList.remove('active');
                state.step = 'name';
                askName();
            } else {
                addMessage("Please enter a valid phone number (e.g., 954-759-1360)", true);
            }
        } else if (state.step === 'name') {
            if (message.length >= 2) {
                addMessage(message, false);
                state.data.name = message;
                userInput.value = '';
                inputArea.classList.remove('active');
                sendBtn.disabled = true;
                sendBtn.textContent = 'Sending...';
                submitBooking();
            } else {
                addMessage("Please enter your full name", true);
            }
        }
    }

    async function submitBooking() {
        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('name', state.data.name);
            formData.append('phone', state.data.phone);
            formData.append('service', state.data.service);
            formData.append('location', state.data.location);
            formData.append('timestamp', new Date().toLocaleString());
            formData.append('source', 'Website Chatbot - Quick Capture');
            
            // Send to Formspree
            const response = await fetch('https://formspree.io/f/mreykovp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                setTimeout(() => {
                    // Generate booking form URL with pre-filled data
                    const formUrl = `detailing-booking-form.html?name=${encodeURIComponent(state.data.name)}&phone=${encodeURIComponent(state.data.phone)}&service=${encodeURIComponent(state.data.service)}`;
                    
                    addMessage(`Perfect, ${state.data.name}! 🚗 <a href="${formUrl}" target="_blank" style="color: #FF6B6B; text-decoration: underline; font-weight: 600;">Click here to complete your booking form</a> (takes 2 min). We'll text you at ${state.data.phone} to confirm your slot!`);
                    sendBtn.disabled = false;
                    sendBtn.textContent = 'Send';
                }, 600);
            } else {
                throw new Error('Submission failed');
            }
            
        } catch (error) {
            console.error('Booking error:', error);
            addMessage("Oops! Something went wrong. Please call us at 954-759-1360 to book directly.", true);
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send';
        }
    }

})();
