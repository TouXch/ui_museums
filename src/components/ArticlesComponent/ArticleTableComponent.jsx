import { Button, Table } from 'reactstrap';

export default function ArticleTableComponent({articles, showModal, setShowModal, deleteArticle}){
    return (
        <Table responsive striped>
            <thead>
                <tr align="center">
                    <th>Article ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Is damaged?</th>
                    <th>Id museum</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (articles.length < 1) ? (
                        <tr>
                            <td colSpan={4}>No hay registros</td>
                        </tr>
                    ) : (
                        articles.map((article) => (
                            <tr key={article.idarticle} align='center'>
                                <td>{article.idarticle}</td>
                                <td>{article.name}</td>
                                <td>{article.description}</td>
                                <td>{article.isdamaged == true ? "Damaged" : "Not Damaged"}</td>
                                <td>{article.idmuseum}</td>
                                <td>
                                    <Button color='info' size='sm' className='me-2'>Editar</Button>
                                    <Button color='warning' size='sm' className='me-2' onClick={() => {deleteArticle(article.idarticle)}}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}