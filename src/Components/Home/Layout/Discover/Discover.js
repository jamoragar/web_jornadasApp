import React from 'react';

const Discover = () => {
    return (
        <section className="section discover-area bg-gray overflow-hidden ptb_100">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        {/* Discover Thumb */}
                        <div className="service-thumb discover-thumb mx-auto pt-5 pt-lg-0">
                            <img src='/img/informacion_app.png' alt="Jornadas por la Rehabilitación APP" />
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 order-1 order-lg-2">
                        {/* Discover Text */}
                        <div className="discover-text pt-4 pt-lg-0">
                            <h2 className="pb-4 pb-sm-0">Interactua Fácilmente con la App!</h2>
                            <p className="d-none d-sm-block pt-3 pb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolor ut iusto vitae autem neque eum ipsam, impedit asperiores vel cumque laborum dicta repellendus inventore voluptatibus et explicabo nobis unde.</p>
                            {/* Check List */}
                            <ul className="check-list">
                                <li className="py-2">
                                    {/* List Box */}
                                    <div className="list-box media">
                                        <span className="icon align-self-center"><i className='fas fa-check'/></span>
                                        <span className="media-body pl-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</span>
                                    </div>
                                </li>
                                <li className="py-2">
                                    {/* List Box */}
                                    <div className="list-box media">
                                        <span className="icon align-self-center"><i className='fas fa-check' /></span>
                                        <span className="media-body pl-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</span>
                                    </div>
                                </li>
                                <li className="py-2">
                                    {/* List Box */}
                                    <div className="list-box media">
                                        <span className="icon align-self-center"><i className='fas fa-check' /></span>
                                        <span className="media-body pl-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</span>
                                    </div>
                                </li>
                                <li className="py-2">
                                    {/* List Box */}
                                    <div className="list-box media">
                                        <span className="icon align-self-center"><i className='fas fa-check' /></span>
                                        <span className="media-body pl-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="icon-box d-flex mt-3">
                            <div className="service-icon pr-3">
                                <span><i className='fas fa-donate fa-fw' /></span>
                            </div>
                            <div className="service-icon pr-3">
                                <span><i className='fas fa-receipt fa-fw' /></span>
                            </div>
                            <div className="service-icon pr-3">
                                <span><i className='fab fa-delicious fa-fw' /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Discover;