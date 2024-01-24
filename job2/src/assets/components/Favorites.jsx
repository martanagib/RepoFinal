import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri"; 
import { removeFavorite } from '../action/utenteActions';
import { IoArrowBack } from "react-icons/io5"



const Favorites = () => {

    const dispatch = useDispatch()
    const favoriteList = useSelector(state => state.utente.list)

    const navigate = useNavigate()

    
    return (
        <div>
            <div className='m-3'>
                    <h1>Preferiti</h1>
                    </div>
                    <Container>
                        <Row>
                
                    <ListGroup>
                        
                        {favoriteList?.length > 0 ? (
                            favoriteList.map((fav, index) => (
                            <ListGroup.Item key={index}>
                                <Col>
                                 {fav}
                                </Col>
                                <Col>
                               <Button  variant='transparent'
                    onClick={() => dispatch(removeFavorite(fav))}
                    className="p-0">
                                 <RiDeleteBinLine />
                                 </Button>
                        </Col>
                            </ListGroup.Item>
                            
                        ))
                        ) : (
                            <ListGroup.Item>Non ci sono preferiti</ListGroup.Item>
                        )}
                    </ListGroup>
                   
                    </Row>
                    </Container>
                    <div className='m-3'>
                    <Button variant="transparent" onClick={() => navigate("/")}> <IoArrowBack /> Ritorna alla Home
                    </Button>
                    </div>
                </div>
         
    )

}

export default Favorites;


//questo component serve per visualizzare la lista dei preferiti. ogni elemento della lista avrà un bottone per eliminare dalla lista l'elemento stesso.
