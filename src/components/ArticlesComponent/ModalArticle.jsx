import { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const modelArticle = {
    idarticle: 0,
    name: "",
    description: "",
    isdamaged: "true",
    idmuseum: 0
}

export default function ModalArticle({showModal, setShowModal, saveArticle, museums}){
    const[article, setArticle] = useState(modelArticle)

    const update = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setArticle({...article, 
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        setArticle(modelArticle)
        console.log(modelArticle)
    }, [])

    const sendArticle = () => {
        if (article.idarticle === 0) {
            saveArticle(article)
        }
        setArticle(modelArticle)
        console.log(article)
    }

    const closeModal = () => {
        setShowModal(!showModal)
    }

    return(
        <Modal isOpen={showModal}>
            <ModalHeader>
                {article.idarticle === 0 ? "New Article" : "Edit Article" }
            </ModalHeader>
            <ModalBody>
            <Form>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input name='name' onChange={(e) => update(e)} value={article.name} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Description</Label>
                        <Input name='description' onChange={(e) => update(e)} value={article.description} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Damaged</Label>
                        <Input name='isdamaged' type='select'  onChange={(e) => update(e)} value={article.isdamaged}>
                            <option value="true">Damaged</option>
                            <option value="false">Not Damaged</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Museum</Label>
                        <Input name='idmuseum' type='select' onChange={(e) => update(e)} value={article.idmuseum}>
                        {
                                (museums.length < 1) ? (
                                    <option>Loading Museums</option>
                                ) : (
                                    museums.map((museum) => (
                                        <option key={museum.idmuseum} value={museum.idmuseum}>{museum.name}</option>
                                    ))
                                )
                        }
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' size='sm' className='me-2' onClick={sendArticle}>Guardar</Button>
                <Button color='danger' size='sm' className='me-2' onClick={closeModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}