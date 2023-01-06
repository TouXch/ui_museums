import { Button, Table } from 'reactstrap';

export default function TableComponent({museums, setEditElement, showModal, setShowModal, deleteMuseum}){

    const sendInfo = (museum) => {
        setEditElement(museum)
        setShowModal(!showModal)
    }

    return (
        <Table responsive striped>
            <thead>
                <tr align="center">
                    <th>Museum ID</th>
                    <th>Name</th>
                    <th>Theme</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (museums.length) < 1 ? (
                        <tr>
                            <td colSpan={4}>No hay registros</td>
                        </tr>
                    ) : (
                        museums.map((museum) => (
                            <tr key={museum.idmuseum} align="center">
                                <td>{museum.idmuseum}</td>
                                <td>{museum.name}</td>
                                <td>{museum.idtheme === 1 ? "Art" : museum.idtheme === 2 ? "Natural Science" : "History"}</td>
                                <td>
                                    <Button color='info' size='sm' className='me-2' onClick={() => {sendInfo(museum)}}>Editar</Button>
                                    <Button color='warning' size='sm' className='me-2' onClick={() => {deleteMuseum(museum.idmuseum)}}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}