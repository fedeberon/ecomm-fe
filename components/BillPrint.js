const BillPrint = () => {
    return (
        <div className="mx-auto p-16" style="max-width: 800px;">
            <div className="flex items-center justify-between mb-8 px-3">
                <div>
                    <span className="text-2xl">Example Invoice #</span>: 0001-2019<br/>
                    <span>Date</span>: January 1st 2019<br/>
                </div>
                <div className="text-right">
                    <img src="https://www.stenvdb.be/assets/img/email-signature.png"/>
                </div>
            </div>

            <div className="flex justify-between mb-8 px-3">
                <div>
                    Pixel &amp; Tonic<br/>
                    919 NW Bond St. Ste 203<br/>
                    Bend, OR 97703 USA<br/>
                    hello@pixelandtonic.com<br/>
                    +1 855-700-5115
                </div>
                <div className="text-right">
                    Company Name<br/>
                    Street 12<br/>
                    10000 City<br/>
                    hello@yoursite.com
                </div>
            </div>

            <div className="border border-t-2 border-gray-200 mb-8 px-3"></div>

            <div className="mb-8 px-3">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquam vestibulum elit, id rutrum
                    sem lobortis eget. In a massa et leo vehicula dapibus. In convallis ut nisi ut vestibulum. Integer
                    non feugiat tellus. Nullam id ex suscipit, volutpat sapien tristique, porttitor sapien.</p>
            </div>

            <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                <div>Development</div>
                <div className="text-right font-medium">1200 EUR</div>
            </div>
            <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                <div>Design</div>
                <div className="text-right font-medium">800 EUR</div>
            </div>
            <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                <div>Licensing</div>
                <div className="text-right font-medium">300 EUR</div>
            </div>

            <div className="flex justify-between items-center mb-2 px-3">
                <div className="text-2xl leading-none"><span className="">Total</span>:</div>
                <div className="text-2xl text-right font-medium">2300 EUR</div>
            </div>

            <div className="flex mb-8 justify-end px-3">
                <div className="text-right w-1/2 px-0 leading-tight">
                    <small className="text-xs">Nullam auctor, tellus sit amet eleifend interdum, quam nisl luctus quam,
                        a tincidunt nisi eros ac dui. Curabitur leo ipsum, bibendum sit amet suscipit sed, gravida non
                        lectus. Nunc porttitor lacus sapien, nec congue quam cursus nec. Quisque vel vehicula ipsum.
                        Donec condimentum dolor est, ut interdum augue blandit luctus. </small>
                </div>
            </div>

            <div className="mb-8 px-3">
                <span>To be paid before</span> Februari 1st 2019 on <b className="underline font-bold">BE71 0961 2345
                6769</b> specifying the invoice #
            </div>

            <div className="mb-8 text-4xl text-center px-3">
                <span>Thank you!</span>
            </div>

            <div className="text-center text-sm px-3">
                hello@yourdomain.com ∖ www.yourdomain.com
            </div>
        </div>
    )
}

export default BillPrint