document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
            const isExpanded = mainNav.classList.contains("active");
            navToggle.setAttribute("aria-expanded", isExpanded);
        });

        const navLinks = mainNav.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (mainNav.classList.contains("active")) {
                    mainNav.classList.remove("active");
                    navToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    const dishes = document.querySelectorAll(".dish-card");
    const emptyState = document.getElementById("emptyState");
    const visibleCountEl = document.getElementById("visible-count");
    const btnResetFilter = document.getElementById("btnResetFilter");

    function updateCounters() {
        let totalCount = dishes.length;
        let entradasCount = document.querySelectorAll('.dish-card[data-category="entradas"]').length;
        let fuertesCount = document.querySelectorAll('.dish-card[data-category="fuertes"]').length;
        let postresCount = document.querySelectorAll('.dish-card[data-category="postres"]').length;
        let especialesCount = document.querySelectorAll('.dish-card[data-category="especiales"]').length; // 0

        document.getElementById("count-todas").textContent = totalCount;
        document.getElementById("count-entradas").textContent = entradasCount;
        document.getElementById("count-fuertes").textContent = fuertesCount;
        document.getElementById("count-postres").textContent = postresCount;
        document.getElementById("count-especiales").textContent = especialesCount;
    }

    updateCounters();

    function filterDishes(category) {
        let visibleCount = 0;

        dishes.forEach(dish => {
            const dishCategory = dish.getAttribute("data-category");

            if (category === "todas" || dishCategory === category) {
                dish.classList.remove("hidden");
                visibleCount++;
            } else {
                dish.classList.add("hidden");
            }
        });

        if (visibleCountEl) {
            visibleCountEl.textContent = visibleCount;
        }

        if (visibleCount === 0) {
            emptyState.classList.remove("hidden");
        } else {
            emptyState.classList.add("hidden");
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            const clickedBtn = e.currentTarget;
            clickedBtn.classList.add("active");
            clickedBtn.setAttribute("aria-pressed", "true");

            const selectedCategory = clickedBtn.getAttribute("data-category");
            filterDishes(selectedCategory);
        });
    });

    if (btnResetFilter) {
        btnResetFilter.addEventListener("click", () => {
            const btnTodas = document.querySelector('.filter-btn[data-category="todas"]');
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });
            if (btnTodas) {
                btnTodas.classList.add("active");
                btnTodas.setAttribute("aria-pressed", "true");
            }
            filterDishes("todas");
        });
    }
});