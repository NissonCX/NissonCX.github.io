// ===========================================
// Main JavaScript
// ===========================================

(function() {
  'use strict';

  // ===========================================
  // 深色模式切换
  // ===========================================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // 获取保存的主题或系统偏好
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // 设置主题
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // 初始化主题
  setTheme(getPreferredTheme());

  // 切换主题
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ===========================================
  // 移动端菜单切换
  // ===========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // 点击菜单项后关闭菜单
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }

  // ===========================================
  // 目录导航生成和高亮
  // ===========================================
  const tocNav = document.getElementById('toc-nav');
  const postContent = document.querySelector('.post-content');

  if (tocNav && postContent) {
    const headings = postContent.querySelectorAll('h2, h3');
    
    if (headings.length > 0) {
      const ul = document.createElement('ul');
      
      headings.forEach(function(heading, index) {
        // 为标题添加 ID
        if (!heading.id) {
          heading.id = 'heading-' + index;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        a.setAttribute('data-heading', heading.id);
        
        // 根据标题级别添加缩进
        if (heading.tagName === 'H3') {
          li.style.paddingLeft = '16px';
        }

        li.appendChild(a);
        ul.appendChild(li);
      });

      tocNav.appendChild(ul);

      // 滚动高亮
      const tocLinks = tocNav.querySelectorAll('a');
      
      function highlightToc() {
        let current = '';
        
        headings.forEach(function(heading) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) {
            current = heading.id;
          }
        });

        tocLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('data-heading') === current) {
            link.classList.add('active');
          }
        });
      }

      window.addEventListener('scroll', highlightToc);
      highlightToc();

      // 平滑滚动
      tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').slice(1);
          const target = document.getElementById(targetId);
          if (target) {
            const offset = 80; // 导航栏高度
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    } else {
      // 没有标题时隐藏目录
      const toc = document.getElementById('toc');
      if (toc) {
        toc.style.display = 'none';
      }
    }
  }

  // ===========================================
  // 图片懒加载
  // ===========================================
  if ('loading' in HTMLImageElement.prototype) {
    // 浏览器原生支持懒加载
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      img.src = img.dataset.src;
    });
  } else {
    // 降级方案：使用 Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  // ===========================================
  // 外部链接新窗口打开
  // ===========================================
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

})();
