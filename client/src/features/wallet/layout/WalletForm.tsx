import React, {useState } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import { CreateWalletDto } from '../../../../../common/walletTypes';
import { extractErrorCode, hasEmptyKey } from '../../../common/utils/utils';
import { createWallet } from '../helpers/walletHelper';
import { required } from '../../auth/components/required';
import ErrorMessage from '../../../common/components/ErrorMessage';
import '../../../common/styles/styles.css'
;

const WalletForm: React.FC = () => {

  const [walletData, setWalletData] = useState<CreateWalletDto>({
    identification: '',
    currency: null,
    identificationType:'CRYPTOCURRENCY WALLET',
    depositMeans:'CRYPTOCURRENCY'
  });
  const [validated, setValidated] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [readOnly, setReadOnly] = useState(true)
 

  const handleChange = (e: any) => {
    let { name,value } = e.target
     if (name === 'currency'|| name==='identificationType'|| name==='depositMeans'){
      value = value.toUpperCase()
     }
    setWalletData((prevData: CreateWalletDto) => ({
      ...prevData,
      [name]: value,
    }));

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    let shouldNotSubmit = hasEmptyKey(walletData);
    setValidated(true);
    try {
      if (shouldNotSubmit) {
        setErrorMessage('Kindly fill the form appropriately.')
        return;
      } else {
        setSubmitting(true)
        await createWallet(walletData);
      }

    } catch (error:any) {
      const code = extractErrorCode(error.message);
      console.error(error);
      if (code === 409) {
        setErrorMessage(`${walletData.currency||walletData.depositMeans} wallet already exists.`);
      } 
      else {
        setErrorMessage('Sorry we cannot complete your request at this time.');
      }
      
    } finally {
      setSubmitting(false)
    }
  };
  const handleToggle = ()=>{
    setReadOnly(!readOnly)
  }

  return (
    <div className="d-flex justify-content-center flex-column align-content-center mt-5 px-2">
      <Form className="form py-5" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
   
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Creating Non-Crypto Deposits?"
        onClick={handleToggle}
      />
      </Form.Group>
      <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Deposit Means{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="depositMeans"
            readOnly={readOnly}
            placeholder={walletData.depositMeans}
            value={walletData.depositMeans}
            onChange={(e) => handleChange(e)}
            className="text-light custom-input bg-transparent form-control"
          />
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Indentification Type{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="identificationType"
            readOnly={readOnly}
            value ={walletData.identificationType}
            placeholder={walletData.depositMeans==='CRYPTOCURRENCY'?'':'e.g tag, email or phone number'}
            onChange={(e) => handleChange(e)}
            className="text-light custom-input bg-transparent form-control"
          />
          </Form.Group>
        <Form.Group className="mb-3" controlId="validationFormik04">
          <Form.Label>Indentification {required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="identification"
            placeholder='enter the actual indentication e.g the wallet address or  tag.'
            value={walletData.identification}
            onChange={(e) => handleChange(e)}
            className="text-light custom-input bg-transparent form-control"
          />
        </Form.Group>
        
        {readOnly && <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Currency{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="currency"
            value={walletData.currency||''}
            onChange={(e) => handleChange(e)}
            placeholder='e.g BITCOIN'
            className="text-light custom-input bg-transparent form-control"
          />
        </Form.Group>
       }
        <div className="d-flex justify-content-center w-100">
          <button className="button-styles w-50 text-light" type={submitting ? 'button' : 'submit'}>
            {submitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </button>
        
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default WalletForm;
