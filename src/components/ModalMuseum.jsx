import { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const modelMuseum = {
    idmuseum: 0,
    name: "",
    idtheme: null
}

export default function ModalMuseum({showModal, setShowModal, saveMuseum, editElement, setEditElement, editMuseum}) {
    const[museum, setMuseum] = useState(modelMuseum)

    const update = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setMuseum({...museum, 
            [e.target.name] : e.target.value
        })
    }

    const sendMuseum = () => {
        if (museum.idmuseum === 0) {
            saveMuseum(museum)
        } else{
            editMuseum(museum)
        }
        setMuseum(modelMuseum)
    }

    useEffect(() => {
        if (editElement != null) {
            setMuseum(editElement)
        } else{
            setMuseum(modelMuseum)
        }
    }, [editElement])

    const closeModal = () => {
        setShowModal(!showModal)
        setEditElement(null)
    }

    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                {museum.idmuseum === 0 ? "New Museum" : "Edit Museum" }
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input name='name' onChange={(e) => update(e)} value={museum.name} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Theme</Label>
                        <Input name='idTheme' onChange={(e) => update(e)} value={museum.idtheme} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' size='sm' className='me-2' onClick={sendMuseum}>Guardar</Button>
                <Button color='danger' size='sm' className='me-2' onClick={closeModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}