(function(){
  const root = document.documentElement;
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('year');

  // Set current year
  yearEl.textContent = new Date().getFullYear();

  // Restore theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if(savedTheme === 'light'){
    root.classList.add('light');
    themeToggle.setAttribute('aria-pressed', 'true');
  }

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Contact form validation + mailto
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      let valid = true;
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      if(!name.value.trim()){
        nameError.textContent = 'Please enter your name.';
        valid = false;
      }
      if(!/^\S+@\S+\.\S+$/.test(email.value)){
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      }
      if(message.value.trim().length < 10){
        messageError.textContent = 'Message should be at least 10 characters.';
        valid = false;
      }

      if(valid){
        const body = encodeURIComponent(`Hi Saranya,%0D%0A%0D%0A${message.value}%0D%0A%0D%0AThanks,%0D%0A${name.value}`);
        const subject = encodeURIComponent('Portfolio Enquiry');
        window.location.href = `mailto:saranyamnm2422k1472@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
      }
    });
  }

  // Simple reveal-on-scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.project, .edu-card, .achievements li, .skills-list li').forEach(el => {
    el.classList.add('will-reveal');
    observer.observe(el);
  });
})();