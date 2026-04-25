// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// 倒计时功能
function updateCountdown() {
    // 设置活动结束时间（2天后）
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    endDate.setHours(23, 59, 59, 999);
    
    function update() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            // 倒计时结束，重置为2天
            endDate.setTime(new Date().getTime() + (2 * 24 * 60 * 60 * 1000));
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    update();
    setInterval(update, 1000);
}

updateCountdown();

// 表单提交处理
const consultForm = document.getElementById('consultForm');
if (consultForm) {
    consultForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 这里可以添加实际的表单提交逻辑
        // 例如：发送到后端API
        
        alert('感谢您的咨询！我们的设计师将在24小时内与您联系。');
        consultForm.reset();
    });
}

// 移动端菜单切换
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // 点击菜单项后关闭菜单
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// 产品卡片悬停效果增强
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 滚动动画（元素进入视口时淡入）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加初始样式和观察
const animatedElements = document.querySelectorAll('.product-card, .case-card, .service-card, .pain-point-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 3D预览按钮点击事件（示例）
const previewButtons = document.querySelectorAll('.btn-outline');
previewButtons.forEach(btn => {
    if (btn.textContent.includes('3D预览')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('3D预览功能即将上线！您可以先联系我们的设计师获取详细信息。');
        });
    }
});

// 购买按钮点击事件（示例）
const buyButtons = document.querySelectorAll('.product-actions .btn-primary');
buyButtons.forEach(btn => {
    if (btn.textContent.includes('立即购买')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            if (confirm(`确认购买 ${productName} 吗？\n\n我们将为您跳转到结算页面。`)) {
                // 这里可以跳转到实际的购买页面
                alert('正在跳转到结算页面...');
            }
        });
    }
});

// 浮动按钮点击统计（可选）
const floatBtn = document.querySelector('.float-btn');
if (floatBtn) {
    floatBtn.addEventListener('click', function() {
        // 可以在这里添加统计代码
        console.log('用户点击了浮动咨询按钮');
    });
}

// 页面加载完成后的初始化
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 加载保存的图片
    loadSavedImages();
});

// 防止表单重复提交
let isSubmitting = false;
if (consultForm) {
    consultForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;
        
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    });
}

// ========== 图片上传功能 ==========

let editMode = false;
let editModeNotice = null;

// 编辑模式切换
const toggleEditModeBtn = document.getElementById('toggleEditMode');
if (toggleEditModeBtn) {
    toggleEditModeBtn.addEventListener('click', function() {
        editMode = !editMode;
        
        if (editMode) {
            document.body.classList.add('edit-mode');
            this.classList.add('active');
            this.querySelector('.edit-text').textContent = '退出编辑';
            showEditModeNotice();
        } else {
            document.body.classList.remove('edit-mode');
            this.classList.remove('active');
            this.querySelector('.edit-text').textContent = '编辑模式';
            hideEditModeNotice();
        }
    });
}

// 显示编辑模式提示
function showEditModeNotice() {
    if (editModeNotice) return;
    
    editModeNotice = document.createElement('div');
    editModeNotice.className = 'edit-mode-notice';
    editModeNotice.textContent = '✏️ 编辑模式已开启，点击图片区域上传图片';
    document.body.appendChild(editModeNotice);
    
    setTimeout(() => {
        if (editModeNotice) {
            editModeNotice.style.opacity = '0';
            setTimeout(() => {
                if (editModeNotice && editModeNotice.parentNode) {
                    editModeNotice.parentNode.removeChild(editModeNotice);
                    editModeNotice = null;
                }
            }, 300);
        }
    }, 3000);
}

// 隐藏编辑模式提示
function hideEditModeNotice() {
    if (editModeNotice && editModeNotice.parentNode) {
        editModeNotice.parentNode.removeChild(editModeNotice);
        editModeNotice = null;
    }
}

// 为所有可编辑图片添加上传功能
const editableImages = document.querySelectorAll('.editable-image');
editableImages.forEach(imageContainer => {
    const uploadBtn = imageContainer.querySelector('.upload-btn');
    const fileInput = imageContainer.querySelector('.image-upload-input');
    const uploadedImage = imageContainer.querySelector('.uploaded-image');
    const imageId = imageContainer.getAttribute('data-image-id');
    
    // 点击上传按钮
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (editMode) {
                fileInput.click();
            }
        });
    }
    
    // 点击容器也可以上传
    imageContainer.addEventListener('click', function(e) {
        if (editMode && e.target === imageContainer) {
            fileInput.click();
        }
    });
    
    // 文件选择处理
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    uploadedImage.src = event.target.result;
                    uploadedImage.style.display = 'block';
                    imageContainer.classList.add('has-image');
                    
                    // 保存到 localStorage
                    saveImage(imageId, event.target.result);
                    
                    // 显示成功提示
                    showUploadSuccess();
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
});

// 保存图片到 localStorage
function saveImage(imageId, imageData) {
    try {
        localStorage.setItem(`image_${imageId}`, imageData);
    } catch (e) {
        console.error('保存图片失败，可能是图片太大:', e);
        alert('图片保存失败，请尝试使用更小的图片（建议小于1MB）');
    }
}

// 加载保存的图片
function loadSavedImages() {
    editableImages.forEach(imageContainer => {
        const imageId = imageContainer.getAttribute('data-image-id');
        const savedImage = localStorage.getItem(`image_${imageId}`);
        
        if (savedImage) {
            const uploadedImage = imageContainer.querySelector('.uploaded-image');
            uploadedImage.src = savedImage;
            uploadedImage.style.display = 'block';
            imageContainer.classList.add('has-image');
        }
    });
}

// 显示上传成功提示
function showUploadSuccess() {
    const notice = document.createElement('div');
    notice.className = 'edit-mode-notice';
    notice.textContent = '✓ 图片上传成功！';
    notice.style.background = '#4caf50';
    document.body.appendChild(notice);
    
    setTimeout(() => {
        notice.style.opacity = '0';
        setTimeout(() => {
            if (notice.parentNode) {
                notice.parentNode.removeChild(notice);
            }
        }, 300);
    }, 2000);
}

// 添加右键菜单删除图片功能
editableImages.forEach(imageContainer => {
    imageContainer.addEventListener('contextmenu', function(e) {
        if (editMode && imageContainer.classList.contains('has-image')) {
            e.preventDefault();
            
            if (confirm('确定要删除这张图片吗？')) {
                const imageId = imageContainer.getAttribute('data-image-id');
                const uploadedImage = imageContainer.querySelector('.uploaded-image');
                
                // 清除图片
                uploadedImage.src = '';
                uploadedImage.style.display = 'none';
                imageContainer.classList.remove('has-image');
                
                // 从 localStorage 删除
                localStorage.removeItem(`image_${imageId}`);
                
                // 重置文件输入
                const fileInput = imageContainer.querySelector('.image-upload-input');
                if (fileInput) {
                    fileInput.value = '';
                }
                
                // 显示删除成功提示
                const notice = document.createElement('div');
                notice.className = 'edit-mode-notice';
                notice.textContent = '✓ 图片已删除';
                notice.style.background = '#f44336';
                document.body.appendChild(notice);
                
                setTimeout(() => {
                    notice.style.opacity = '0';
                    setTimeout(() => {
                        if (notice.parentNode) {
                            notice.parentNode.removeChild(notice);
                        }
                    }, 300);
                }, 2000);
            }
        }
    });
});

