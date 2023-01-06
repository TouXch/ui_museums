import { Button, Card, CardBody, CardHeader, Col, Container, Input, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import ArticleTableComponent from './ArticleTableComponent'
import ModalArticle from './ModalArticle'


export default function Article() {
    const[articles, setArticles] = useState([])
    const[showModal, setShowModal] = useState(false)
    const[editElement, setEditElement] = useState(null)
    const[museums, setMuseums] = useState([])
    const[museumID, setMuseumID] = useState(1)

    const getArticles = async () => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Article/list')

        if (api.ok) {
            const articlesAPI = await api.json()
            setArticles(articlesAPI.response)
            document.getElementById("museumSelect").getElementsByTagName('option')[0].selected = 'selected'
        } else{
            console.log("la lista esta vacia aun")
        }
    }

    const getMuseums = async () => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Museum/list')

        if (api.ok) {
            const museumsAPI = await api.json()
            setMuseums(museumsAPI.response)
        }
    }

    const getArticlesByMuseum = async(idmuseum) => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Article/listByMuseum/' + idmuseum)

        if (api.ok) {
            const articlesAPI = await api.json()
            setArticles(articlesAPI.response)
        }else{
            setArticles([])
        }
    }

    useEffect(() => {
        getArticles()
        getMuseums()
    },[])

    const saveArticle = async (article) => {
        const api = await fetch('http://www.museumsapi.somee.com/api/Article/addArticle', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(article)
        })

        if (api.ok) {
            setShowModal(!showModal)
            getArticles()
        }
    }

    //Falta el metodo en el api para editar articulos hay que cambiar esta url del fetch
    //const editArticle = async (article) => {
    //    const api = await fetch('http://www.museumsapi.somee.com/api/Museum/edit', {
    //        method: 'PUT',
    //        headers: {'Content-Type': 'application/json;charset=utf-8'},
    //        body: JSON.stringify(article)
    //    })
    //
    //    if (api.ok) {
    //        setShowModal(!showModal)
    //        getArticles()
    //    }
    //}

    const deleteArticle = async (id) => {
        var respuesta = window.confirm("do you want eliminate the article?")

        if (!respuesta) {
            return
        }

        const api = await fetch('http://www.museumsapi.somee.com/api/Article/deleteArticle/' + id, {
            method: 'DELETE',
        })

        if (api.ok) {
            getArticles()
        }
    }

    return (
        <Container>
            <Row className='mt-5'>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Articles List</h5>
                        </CardHeader>
                        <CardBody>
                            <div className='input-group'>
                                <Input id='museumSelect' type='select' className='me-2' onChange={(e) => setMuseumID(parseInt(e.target.value))}>
                                    {
                                        (museums.length < 1) ? (
                                            <option>Loading museums</option>
                                        ) : (
                                            museums.map((museum) => (
                                                <option key={museum.idmuseum} value={museum.idmuseum}>{museum.name}</option>
                                            ))
                                        )
                                    }
                                </Input>
                                <Button size='sm' color='primary' className='me-2' onClick={() => {getArticlesByMuseum(museumID)}}>Search</Button>
                                <Button size='sm' color='danger' onClick={getArticles}>Show all</Button>
                            </div>
                            <Button size='sm' color='success' className='me-2 mt-2' onClick={() => {setShowModal(!showModal)}}>Add Article</Button>                    
                            <hr />
                            <ArticleTableComponent articles={articles}
                                                    showModal={showModal}
                                                    setShowModal={setShowModal}
                                                    deleteArticle={deleteArticle}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalArticle showModal={showModal}
                            setShowModal={setShowModal}
                            saveArticle={saveArticle}
                            museums={museums}                            
            />
        </Container>
    )
}