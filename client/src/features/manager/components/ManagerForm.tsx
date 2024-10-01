import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { required } from '../../auth/components/required';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { createManager , getSingleManager, patchManager } from '../helpers/managerApiHelpers';
import { useNavigate } from 'react-router-dom';
import { hasEmptyKey } from '../../../common/utils/utils';
import { CreateManagerDto, ManagerDto } from '../../../../../common/managerType';

const ManagerForm: React.FC<{ patch?: boolean }> = ({ patch }) => {
  const [managerData, setManagerData] = useState<CreateManagerDto|ManagerDto>({
    id:0,
    firstName: '',
    lastName: '',
    image: '',
    duration: 0,
    qualification: '',
    minimumInvestmentAmount: 0,
    percentageYield: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [files, setFiles] = useState<File | null>(null);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 25,
    y: 25,
    width: 100,
    height: 100,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagerData = async () => {
      const id = localStorage.getItem('cassockManager');
      if (patch && id) {
        try {
          const manager = await getSingleManager(id);
          if (manager) setManagerData(manager);
          console.log(manager)
        } catch (error) {
          console.error(error);
          setErrorMessage('An error occurred while fetching manager data. Please try again later.');
        }
      }
    };

    fetchManagerData();
  }, [patch]);

  const dataURLtoBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error('Invalid data URL');

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const getCroppedBlob = (file: File, crop: Crop): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target?.result as string;

        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject('Unable to get 2d context');
            return;
          }

          const aspectRatio = image.width / image.height;
          const canvasWidth = crop.width;
          const canvasHeight = crop.width / aspectRatio;

          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);

          const croppedImage = canvas.toDataURL('image/jpeg', 1);
          const blobImage = dataURLtoBlob(croppedImage);
          resolve(blobImage);
        };
      };

      reader.onerror = () => {
        reject('Error reading file');
      };

      reader.readAsDataURL(file);
    });
  };

  const handleCropDone = async () => {
    if (!files) {
      setErrorMessage('No file selected for cropping.');
      return;
    }
    setShow(false);

    try {
      const croppedBlob = await getCroppedBlob(files, crop);
      const croppedFile = new File([croppedBlob], files.name, { type: files.type });

      setManagerData((prevData) => ({
        ...prevData,
        image: croppedFile,
      }));
    } catch (error) {
      setErrorMessage('Error processing the image.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManagerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShow(true);
    if (e.target.files) {
      setFiles(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(managerData)
    if (patch && hasEmptyKey(managerData as ManagerDto)) {
      setValidated(false);
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!managerData.image) {
      setErrorMessage('Please upload a valid image.');
      return;
    }

    setSubmitting(true);
    setValidated(true);

    try {
      const formData = new FormData();
      Object.entries(managerData).forEach(([key, value]) => {
        if (key === 'image' && value instanceof Blob) {
          formData.append(key, value, (value as File).name);
        } else {
          formData.append(key, value);
        }
      });

      if (patch && managerData) {
       const id = (managerData as ManagerDto).id;
        await patchManager(formData, navigate,id);
      } else {
        await createManager(formData);
      }
    } catch (error: any) {
      setErrorMessage(`Form submission error: ${error.message}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center mt-5 px-2">
      {files && (
        <Modal show={show}>
          <ReactCrop circularCrop aspect={1} crop={crop} onChange={(c) => setCrop(c)}>
            <img className='w-100' src={URL.createObjectURL(files)} alt='Crop Preview' />
          </ReactCrop>
          <button onClick={() => handleCropDone()}>Done</button>
        </Modal>
      )}
      <Form className="form py-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label className="mb-0">First name{required}</Form.Label>
            <Form.Control
              required={patch ? false : true}
              type="text"
              name="firstName"
              value={managerData.firstName}
              onChange={handleChange}
              className="text-light custom-input bg-transparent form-control"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="mb-0">Last name{required}</Form.Label>
            <Form.Control
              required={patch ? false : true}
              type="text"
              name="lastName"
              value={managerData.lastName}
              onChange={handleChange}
              className="text-light custom-input bg-transparent form-control"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Qualification{required}</Form.Label>
          <Form.Control
            required={patch ? false : true}
            type="text"
            name="qualification"
            value={managerData.qualification}
            onChange={handleChange}
            className="text-light custom-input bg-transparent form-control"
          />
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik04">
          <Form.Label className="mb-0">Percentage Yield{required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="percentageYield"
            value={managerData.percentageYield}
            onChange={handleChange}
            className="custom-input bg-transparent form-control text-light"
          />
        </Form.Group>
        <Form.Group className="mb-4" as={Col} controlId="validationFormik04">
          <Form.Label className="mb-0">Duration of Investment in days {required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="duration"
            value={managerData.duration + ''}
            onChange={handleChange}
            className="custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik04">
          <Form.Label className="mb-0">Minimum Investment Amount in USD{required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="minimumInvestmentAmount"
            value={managerData.minimumInvestmentAmount}
            onChange={handleChange}
            className="custom-input bg-transparent form-control text-light"
          />
        </Form.Group>

        <Form.Group as={Col} sm="12" className="mb-4" controlId="validationFormik05">
          <Form.Label className="mb-0">Manager's picture</Form.Label>
          <Form.Control
            type="file"
            formEncType='multipart/form-data'
            name="image"
            onChange={handleFileChange}
            className="custom-input text-light bg-transparent form-control"
          />
        </Form.Group>

        <div className="d-flex justify-content-center w-100">
          <button className="button-styles w-50 text-light" type={submitting ? 'button' : 'submit'}>
            {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default ManagerForm;
