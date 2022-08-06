import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
    font-family: Gilroy-Bold;
    font-size: 24px;
    padding-right: ${props=>props.pr||''};
    padding-left: ${props=>props.pl||''};
    padding-top: ${props=>props.pt||''};
    padding-bottom: ${props=>props.pb||''};
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||''};
    margin-bottom: ${props=>props.mb||''};
    a{
        color: #824100;
    }
`
const Logo = props => {
    return <Wrapper {...props}>
        <Link href="/">Agadi</Link>
    </Wrapper>
}
export default Logo;