document.addEventListener('DOMContentLoaded', () => {
    document.body.style.display = 'none';
    document.body.style.background = `url('${config.background}') no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';

    const menu = document.getElementById('menu');
    const menuContainer = document.querySelector('.menu-container');

    config.buttons.forEach(columnButtons => {
        const column = document.createElement('div');
        column.classList.add('column');
        columnButtons.forEach(buttonConfig => {
            const button = document.createElement('button');
            button.classList.add('menu-item');
            button.innerHTML = `<i class="${buttonConfig.icon} icon"></i>${buttonConfig.text}`;
            button.addEventListener('click', () => {
                showLoadingSpinner();
                setTimeout(() => {
                    $.post(`https://${GetParentResourceName()}/SELECT`, JSON.stringify(buttonConfig));
                    hideLoadingSpinner();
                    hideUI();
                }, 2000);
            });
            column.appendChild(button);
        });
        menu.appendChild(column);
    });

    const columnCount = document.querySelectorAll('.column').length;
    menuContainer.classList.add(
        columnCount === 1 ? 'one-column' : columnCount === 2 ? 'two-columns' : 'three-or-more-columns'
    );

    const toggleButtons = (disabled) => {
        document.querySelectorAll('.menu-item').forEach(button => button.disabled = disabled);
    };

    const showLoadingSpinner = () => {
        const spinner = document.createElement('div');
        spinner.classList.add('loading-spinner');
        spinner.id = 'loading-spinner';
        document.body.appendChild(spinner);
        spinner.style.display = 'block';
        toggleButtons(true);
    };

    const hideLoadingSpinner = () => {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.remove();
        }
        toggleButtons(false);
    };

    if (config.enableEscape) {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                $.post(`https://${GetParentResourceName()}/CLOSE_UI`);
                hideUI();
            }
        });
    }

    window.addEventListener("message", (event) => {
        if (event.data.action === "SHOW_UI") showUI();
    });

    window.hideUI = () => document.body.style.display = 'none';
    window.showUI = () => {
        document.body.style.display = 'block';
        if (config.particles) initParticles();
    };
});
