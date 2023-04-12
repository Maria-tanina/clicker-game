 // Tabs
    
export function hideTabContent(tabs, tabsContent) {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

export 
function showTabContent(i = 0, tabs, tabsContent) {
tabsContent[i].classList.add('show', 'fade');
tabsContent[i].classList.remove('hide');
tabs[i].classList.add('tabheader__item_active');
}