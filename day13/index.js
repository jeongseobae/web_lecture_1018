export default async function main() {
    console.log('start App')  

    const mainMenu = document.querySelector('#main-menu')
    const creditScreen = document.querySelector('#credit-screen')
    // 옵션 스크린 선택자 추가
    const optionScreen = document.querySelector('#option-screen')
    
    let currentScreen = "mainMenu"
    
    let currentIndex = 0;
    const menuitems = document.querySelectorAll(".menu-item");

    console.log(menuitems.length)
    const menuitem_count = menuitems.length

    menuitems[currentIndex].classList.add("select")

    window.addEventListener("keydown", (e) => {
        
        // 중요: 화면 상태에 따라 로직을 완전히 분리해야 오류가 안 납니다.
        
        // 1. 메인 메뉴일 때의 동작
        if(currentScreen == "mainMenu") {
            
            // 기존 선택 표시 지우기 (메인 메뉴일 때만 실행되어야 함)
            menuitems[currentIndex].classList.remove('select')

            console.log(e.key)
            if(e.key == "ArrowUp") {
                currentIndex--
                if(currentIndex < 0) {
                    currentIndex = menuitem_count-1
                }
            }
            else if(e.key == "ArrowDown") {
                currentIndex++
                currentIndex %= menuitem_count
            }
            else if(e.key == "Enter") {
                console.log(menuitems[currentIndex].dataset.action)
                const select_action = menuitems[currentIndex].dataset.action

                if(select_action == 'credit') {
                    mainMenu.classList.add('hide')
                    creditScreen.classList.remove('hide')
                    currentScreen = "creditScreen"
                }
                // 옵션 화면 진입 로직 추가
                else if(select_action == 'option') {
                    mainMenu.classList.add('hide')
                    optionScreen.classList.remove('hide')
                    currentScreen = "optionScreen"
                }
            }

            console.log(currentIndex)
            // 변경된 인덱스에 선택 표시
            menuitems[currentIndex].classList.add('select')
            
        }
        // 2. 크레딧 화면일 때의 동작
        else if(currentScreen == "creditScreen") {

            console.log('credit screen')

            if(e.key == "Enter" || e.key == "Escape") { // ESC 키도 지원하면 좋습니다
                creditScreen.classList.add('hide')
                mainMenu.classList.remove('hide')
                currentScreen = "mainMenu"
            }
        }
        // 3. 옵션 화면일 때의 동작 (추가됨)
        else if(currentScreen == "optionScreen") {
            
            console.log('option screen')

            // 여기서도 엔터를 치면 돌아오게 설정 (추후 내부 메뉴 이동 필요시 로직 수정 가능)
            if(e.key == "Enter" || e.key == "Escape") {
                optionScreen.classList.add('hide')
                mainMenu.classList.remove('hide')
                currentScreen = "mainMenu"
            }
        }

    })
}