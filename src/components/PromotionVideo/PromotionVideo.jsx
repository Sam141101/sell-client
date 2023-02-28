import styled from 'styled-components';

const BlockVideo = styled.div``;

const HeightBlock = styled.div``;

const PromtionVideo = () => {
    return (
        <HeightBlock>
            <div className="grid wide">
                <div className="row">
                    <div className="col l-12">
                        {/* <BlockVideo> */}
                        <iframe
                            style={{ width: '100%', minHeight: '550px' }}
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/ISOIS6CVy4g"
                            title="YouTube video player"
                            // frameborder="0"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            // allowfullscreen
                            allowFullScreen
                        ></iframe>
                        {/* </BlockVideo> */}
                    </div>
                </div>
            </div>
        </HeightBlock>
    );
};

export default PromtionVideo;
