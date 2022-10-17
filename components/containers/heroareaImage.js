import styled from "styled-components";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    order: 1;
    @media screen and (min-width: 764px){
        order: 2;
        right: 0px;
    }
`
const InnerWrapper = styled.div`
    
`
const ImgContainer = styled.div`
    width: 300px;
    height: 300px;
    border-top-right-radius: 60px;
    border-top-left-radius: 60px;
    border-bottom-left-radius: 80px;
    background-color: #cccccc;
    background-image: url('/images/old-lady.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    @media screen and (min-width: 992px){
        width: 400px;
        height: 400px;
        border-top-right-radius: 80px;
        border-top-left-radius: 80px;
        border-bottom-left-radius: 100px;
    }
`
const Bigcircle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-color: #024150;
    position: absolute;
    bottom: -20px;
    left: -20px;
    @media screen and (min-width: 992px){
        width: 130px;
        height: 130px;
        border-radius: 130px;
        bottom: -40px;
        left: -40px;
    }
`
const Smallcircle = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #ffffff;
    position: absolute;
    bottom: -20px;
    left: 40px;
    @media screen and (min-width: 992px){
        width: 70px;
        height: 70px;
        border-radius: 70px;
        bottom: -30px;
    }
`
const Bottomline = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 400px;
    height: 400px;
    border-bottom: 1px solid #cccccc;
    @media screen and (min-width: 992px){
        width: 500px;
    }
`
const DottedMemphis = styled.img`
    position: absolute;
    bottom: -200px;
    right: -120px;
`
const HeroareaImage = props =>{
    return(
        <Wrapper>
            <ImgContainer/>
            <Bottomline/>
            <Bigcircle/>
            <Smallcircle/>
            <DottedMemphis src="/images/dotted memphis.svg"/>
        </Wrapper>
    )
}

export default HeroareaImage;