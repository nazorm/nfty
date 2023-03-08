import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from './components/Card';
import { Modal } from 'antd';
import { formatDateTime } from '../../utils/formatters';


export const Hompage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nftDescription, setNFTDescription] = useState<any>();

    const [collectionResponse, setCollectionResponse] = useState<any>()
    const fetchNFTs = () => {
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        fetch('https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=18', options)
            .then(response => response.json())
            .then(response => setCollectionResponse(response.orders))
            .catch(err => console.error(err));

    }
    useEffect(() => {
        fetchNFTs();
    }, []);


    const handleModal = (id: string) => {
        const selectedCard = collectionResponse.find((card: { relay_id: string; }) => card.relay_id === id)

        setNFTDescription(selectedCard)
        console.log('description', nftDescription);
        setIsModalOpen(true);
    }

    const handleOk = (link: string) => {
        window.open(link, '_blank');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (

        <Wrapper>
            <h1 className='header'>Nfty <span className='header-span'>- Offer NFTs</span></h1>
            <CardContainer>

          
            {collectionResponse?.map((data: any) => {
                return <Card
                    handleModal={() => handleModal(data.relay_id)}
                    key={data.relay_id}
                    data={data}
                />
            })}
            <Modal
                title={nftDescription?.maker_asset_bundle.assets[0].name ? nftDescription?.maker_asset_bundle.assets[0].name : 'Unamed'}
                open={isModalOpen}
                onOk={() => handleOk(nftDescription?.maker_asset_bundle.assets[0].permalink)}
                onCancel={handleCancel} okText="Purchase"
                cancelText="Back"
                className="description-modal"
            >
                <p className='nft-description'><span >Owner : </span>{nftDescription?.maker.user}</p>
                <p className='nft-description'> <span>Collection : {nftDescription?.maker_asset_bundle.assets[0].asset_contract.name}</span></p>
                <p className='nft-description'> <span>Closes : </span>{formatDateTime(nftDescription?.closing_date)}</p>
            </Modal>
            </CardContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width: 100%;
text-align: center;
font-family: 'Poppins', sans-serif;
.header{
    margin-top: 5%;
        font-weight: 900;
        &-span{
            font-weight: 300;
            font-size: 20px;
        }
    }
`;
const CardContainer = styled.div`
	width: 80%;
    text-align: center;
	margin: 5% auto 10%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 16px;
    .description-modal .ant-modal-header{
      font-weight: 900;
    }
`;