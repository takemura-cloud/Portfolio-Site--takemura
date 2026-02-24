'use strict';
{
   // ナビゲーションの開閉
$('.nav__btn').on('click', function() {
    $('#global-nav').toggleClass('active'); 
    
    // アクセシビリティの更新
    let expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !expanded);
    $('#global-nav').attr('aria-hidden', expanded);
});

// モーダル外（またはリンク）クリックで閉じる
$('#global-nav').on('click', function(e) {
    if ($(e.target).is('#global-nav') || $(e.target).closest('.c-nav-link').length) {
        $(this).removeClass('active');
        $('.nav__btn').attr('aria-expanded', 'false');
        $(this).attr('aria-hidden', 'true');
    }
});


//ボタン開閉操作
document.querySelectorAll('.js-toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.works__item') || button.closest('section');
        
       // 1. 対象となる「詳細エリア」を特定
        let detail;
        const isMoreBtn = button.classList.contains('works__more-btn');
        
        if (isMoreBtn) {
            const worksContainer = button.closest('.works__content') || button.closest('section');
            detail = worksContainer.querySelector('.works__item--secondary');
        } else {
            detail = item.querySelector('.works__detail') || item.querySelector('.profile-more');
        }
        
        if (!detail) return;

        const isOpen = button.getAttribute('aria-expanded') === 'true';
        const textNode = button.querySelector('.c-btn-toggle__text');
        const iconPlus = button.querySelector('.icon-plus');
        const iconMinus = button.querySelector('.icon-minus');

        if (isOpen) {
            // --- 閉じる ---
            $(detail).slideUp();
            button.setAttribute('aria-expanded', 'false');
            
            // テキストの切り替え
            if (isMoreBtn) {
                textNode.textContent = 'すべて見る';
            } else {
                textNode.textContent = '詳しく見る';
            }
            
            // アイコンの切り替え
            if(iconPlus) iconPlus.style.display = 'inline';
            if(iconMinus) iconMinus.style.display = 'none';

        } else {
            // --- 開く ---
            $(detail).slideDown();
            button.setAttribute('aria-expanded', 'true');
            
            // テキストの切り替え（どちらのボタンでも「閉じる」にする）
            textNode.textContent = '閉じる';
            
            // アイコンの切り替え
            if(iconPlus) iconPlus.style.display = 'none';
            if(iconMinus) iconMinus.style.display = 'inline';
        }
    });
});



//ページトップボタン
    const pageTopBtn = document.getElementById("js-pagetop");

    // スクロール位置に応じてボタンの表示/非表示を切り替える
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            pageTopBtn.classList.add('is-show');
        } else {
            pageTopBtn.classList.remove('is-show');
        }
    });

    // ページトップへスクロール
    pageTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    });
}