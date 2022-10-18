import PageContainer from "../components/containers/pageContainer"
import styled from "styled-components";
import { Title, Subtitle } from "../components/containers/heroareaContent";
import { Button, Logo } from '../components/core/core'
import { useRouter } from "next/router";
const Heroarea = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    
    @media screen and (min-width: 768px){
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
       
    }
`
const LeftWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;

    @media screen and (min-width: 768px){
        width: 400px;
        padding-right: 20px;
    }
    @media screen and (min-width: 992px){
        width: 600px;
    }
`
const Image = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('/images/old-lady.jpg');
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    #fade{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: block;
    }
    @media screen and (min-width: 768px){
        width: 350px;
        position: relative;
        #fade{
            display: none;
        }
    }
    @media screen and (min-width: 992px){
        width: 500px;
    }
`
const WriteupWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    #writeupInner{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`
const Title2 = styled(Title)`
    @media screen and (max-width: 768px){
        color: #ffffff;
    }
`
const Subtitle2 = styled(Subtitle)`
    @media screen and (max-width: 768px){
        color: #ffffff;
    }
` 
const Logo2 = styled(Logo)`
@media screen and (max-width: 768px){
    border-radius: 10px;
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
}
` 
const Page404 = props =>{
    const router = useRouter();
    const clickHandler = () =>{
        router.push('/')
    }
    return(
        <PageContainer>
            <Heroarea>
                <LeftWrapper>
                    <Logo2 mt="24px"/>
                    <WriteupWrapper>
                        <div id="writeupInner">
                        <Title2>OOPs...</Title2>
                        <Subtitle2>The page you are trying to reach does not exist. Go back to HomePage.</Subtitle2>
                        <Button solid click={clickHandler}>HomePage</Button>
                        </div>
                    </WriteupWrapper>
                </LeftWrapper>
                <Image>
                    <div id="fade"></div>
                </Image>
            </Heroarea>
        </PageContainer>
    )
}
export default Page404;