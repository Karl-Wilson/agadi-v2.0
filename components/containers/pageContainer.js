import {PageWrapper, PageInnerWrapper} from "../core/core"
const PageContainer = props =>{
    return(
        <PageWrapper>
            <PageInnerWrapper>
                {props.children}
            </PageInnerWrapper>
        </PageWrapper>
    )
}
export default PageContainer;