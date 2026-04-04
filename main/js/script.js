document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let isScrollingFromClick = false; // ক্লিক ডিটেক্ট করার জন্য ফ্ল্যাগ

    // ১. মেনু ক্লিকের মাধ্যমে স্মুথ স্ক্রলিং
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            isScrollingFromClick = true; // ক্লিক শুরু হলো

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // আগে সব লিঙ্ক থেকে active ক্লাস সরান এবং বর্তমানটিতে যোগ করুন
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            window.scrollTo({
                top: targetSection.offsetTop - 70, 
                behavior: 'smooth'
            });

            // স্ক্রলিং শেষ হওয়ার পর ফ্ল্যাগ ফলস করে দিন (টাইমআউট দিয়ে)
            setTimeout(() => {
                isScrollingFromClick = false;
            }, 800); // ৮০০ মিলিসেকেন্ড পর আবার স্ক্রল ডিটেকশন চালু হবে
        });
    });

    // ২. মাউস দিয়ে স্ক্রল করলে অটোমেটিক বর্ডার মুভ হওয়া
    window.addEventListener('scroll', () => {
        if (isScrollingFromClick) return; // যদি মেনু থেকে ক্লিক হয়, তবে নিচের অংশ কাজ করবে না

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) { // ১০০ পিক্সেল অফসেট রাখা হয়েছে
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
