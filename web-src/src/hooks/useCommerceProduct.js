import {useEffect, useState} from 'react'
import {callAction} from "../utils";

export const useCommerceProduct = (props, sku) => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await callAction(props, 'codexpect/commerce', {sku: sku})
            setProduct(result.error ? null : result);
        };

        if (sku) {
            fetchData()
        }
    }, [sku]);

    return {product}
}
