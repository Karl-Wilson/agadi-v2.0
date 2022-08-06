import {Input} from '../core/form/form'
import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
`
const SearchIcon = styled.img`
    margin-right: 10px;
    cursor: pointer;
`
const SearchInput = styled(Input)`
    width: 0px;
    height: 40px;
    padding: 0px;
    border: 0px;
    background-color: transparent;
    transition: .5s width, .5s padding;
    &.showSearch{
        width: 100px;
        padding: 5px;
        border-bottom: 1px solid #cccccc;
    }
    @media screen and  (min-width: 764px){
        &.showSearch{
            width: 160px;
            padding: 10px;
        }
    }
`
const SearchBar = props =>{
    const iconHandler = () =>{
        document.getElementById('SearchInput').classList.toggle('showSearch')
    }
    return(
        <Wrapper>
            <SearchIcon id="SearchIcon" src="/images/search-icon.svg" onClick={iconHandler}/>
            <SearchInput id="SearchInput" placeholder="Search"/>
        </Wrapper>
    )
}

export default SearchBar;