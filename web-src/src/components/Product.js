import React, {useEffect, useState} from 'react'
import {Button, Content, Flex, Heading, ProgressCircle, TextField, View} from '@adobe/react-spectrum'
import {useCommerceProduct} from "../hooks/useCommerceProduct";

export const Product = (props) => {
  const [sku, setSku] = useState('24-MB01');
  const [submittedSku, setSubmittedSku] = useState(sku);
  const {product} = useCommerceProduct({...props}, submittedSku);

  const handleSubmit = () => {
    setSubmittedSku(sku);
  };

  return (
      <View>
        <TextField label="Product SKU" value={sku} onChange={setSku} marginBottom={10}/>
        <Flex>
          <Button variant="cta" onPress={handleSubmit}>Fetch Product</Button>
        </Flex>
        <Content marginTop={10}>{product.name}</Content>
      </View>
  )
}
