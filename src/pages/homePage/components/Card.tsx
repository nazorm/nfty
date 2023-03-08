import React from 'react';
import styled from 'styled-components';


interface INNFTCard {
    data: any;
    handleModal: () => void
}

export const Card = (props: INNFTCard) => {
    const { data, handleModal } = props;

    return (
        <>
            <Box onClick={handleModal}>
                <img src={data.maker.profile_img_url
                } alt='order' />
                <p>{data.maker_asset_bundle.assets[0].name ? data.maker_asset_bundle.assets[0].name : 'Unamed'}</p>
            </Box>

        </>

    )

};

const Box = styled.div`
    cursor: pointer;
    width: 100%;
    height: 300px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding-top: 10px;
    img{
        width: 300px;
        height: 250px;
    }
`;
