import { useEffect } from "react"
export const useMenuDropdown = (id) =>{
    useEffect(() => {
        window.addEventListener('resize', function(){
          if(window.innerWidth > 768){
              document.getElementById(id).classList.remove('show')
          }
        })
      
        return () => {
          window.removeEventListener('resize', function(){
              if(window.innerWidth > 768){
                  document.getElementById(id).classList.remove('show')
              }
            })
        }
      }, [])
      const menuHandler = () =>{
          document.getElementById(id).classList.toggle('show')
          console.log('clicked')
      }
      return menuHandler;
}