
const CustomizeProducts = () => {
    return (
        <div className='customize-products-wrapper'>
            <h4>Elige el color</h4>
            <ul className='customize-products-color-picker'>
                <li className='customize-products-color-picker-item'>
                    <div className='customize-products-color-picker-item-circle' />
                </li>
            </ul>
            <h4>Variaciones según almacenamiento</h4>
            <ul className='customize-products-store-variations'></ul>
        </div>
    )
}

export default CustomizeProducts