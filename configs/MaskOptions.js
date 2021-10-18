export const MaskOfPrices = () => {
    const defaultMaskOptions = {
        prefix: '',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 2, // how many digits allowed after the decimal
        integerLimit: 5, // limit length of integer numbers
        allowNegative: false,
        allowLeadingZeroes: false,
    }

    return defaultMaskOptions;
}