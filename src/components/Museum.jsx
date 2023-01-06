import { Button, Card, CardBody, CardHeader, Col, Container, Input, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import TableComponent from './TableComponent';
import ModalMuseum from './ModalMuseum';

export default function Museum(){
    const[museums, setMuseums] = useState([])
    const[showModal, setShowModal] = useState(false)
    const[editElement, setEditElement] = useState(null)
    const[themeID, setThemeID] = useState(1)
    const[themes, setThemes] = useState([])

    const getThemes = async () => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Theme/list')

        if (api.ok) {
            const themesAPI = await api.json()
            setThemes(themesAPI.response)
        }
    }

    const getMuseums = async() => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Museum/list')
        
        if (api.ok) {
            const museumsAPI = await api.json()
            setMuseums(museumsAPI.response)
            document.getElementById("themeSelect").getElementsByTagName('option')[0].selected = 'selected'
        } else{
            console.log("la lista esta vacia aun")
        }
    }

    const getMuseumsByTheme = async(idtheme) => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Museum/listByTheme/' + idtheme)

        if (api.ok) {
            const museumsAPI = await api.json()
            setMuseums(museumsAPI.response)
        }
    }

    useEffect(() => {
        getMuseums()
        getThemes()
    },[])

    const saveMuseum = async (museum) => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Museum/saveMuseum', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(museum)
        })

        if (api.ok) {
            setShowModal(!showModal)
            getMuseums()
        }
    }

    const editMuseum = async (museum) => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Museum/edit', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(museum)
        })

        if (api.ok) {
            setShowModal(!showModal)
            getMuseums()
        }
    }

    const deleteMuseum = async (id) => {
        var respuesta = window.confirm("do you want eliminate the museum?")

        if (!respuesta) {
            return
        }

        const api = await fetch('http://www.museumsapi.somee.com/api/Museum/delete/' + id, {
            method: 'DELETE',
        })

        if (api.ok) {
            getMuseums()
        }
    }

    return(
        <Container>
        <Row className='mt-5'>
            <Col sm="12">
            <Card>
                <CardHeader>
                <h5>Museums List</h5>
                </CardHeader>
                <CardBody>
                    <div className='input-group'>
                        <Input id='themeSelect' type='select' className='me-2' onChange={(e) => setThemeID(parseInt(e.target.value))}>
                            {
                                (themes.length < 1) ? (
                                    <option>Loading Themes</option>
                                ) : (
                                    themes.map((theme) => (
                                        <option key={theme.idtheme} value={theme.idtheme}>{theme.name}</option>
                                    ))
                                )
                            }
                        </Input>
                        <Button size='sm' color='primary' className='me-2' onClick={() => {getMuseumsByTheme(themeID)}}>Search</Button>
                        <Button size='sm' color='danger' onClick={getMuseums}>Show all</Button>
                    </div>
                    <Button size='sm' color='success' className='me-2 mt-2' onClick={() => {setShowModal(!showModal)}}>Add Museum</Button>
                    
                    <hr />
                    <TableComponent museums={museums} 
                                    setEditElement={setEditElement} 
                                    showModal={showModal} 
                                    setShowModal={setShowModal}
                                    deleteMuseum={deleteMuseum}
                    />
                </CardBody>
            </Card>
            </Col>
        </Row>

        <ModalMuseum showModal={showModal} 
                    setShowModal={setShowModal} 
                    saveMuseum={saveMuseum} 
                    editElement={editElement} 
                    setEditElement={setEditElement} 
                    editMuseum={editMuseum} 
        />

        </Container>
    )
}