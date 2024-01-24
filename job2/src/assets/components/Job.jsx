import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addFavorite, removeFavorite } from '../action/utenteActions'
import { BsStar, BsStarFill } from 'react-icons/bs';

const Job = ({ data }) => {

  const dispatch = useDispatch()
  const favoriteList = useSelector((state) => state.utente.list)

  const isFavorite = favoriteList.includes(data.title)

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(data.title))
    } else {
      dispatch(addFavorite(data.title))
    }
  }

  return (
    <Row
      className="mx-0 mt-3 p-3"
      style={{ border: '1px solid #00000033', borderRadius: 4 }}
    >
      <Col xs={2}>
        <Link to={`/${data.company_name}`}>{data.company_name}</Link>
      </Col>
      <Col xs={9}>
        <a href={data.url} target="_blank" rel="noreferrer"className='text-black' >
          {data.title}
        </a>
      </Col>
      <Col xs={1}>
        <div 
          onClick={handleFavorite} className='p-0'>
          {isFavorite ? <BsStarFill size={30} color="#f8d322" /> : <BsStar size={30} color="f8d322" />}
          </div>
          </Col>
    </Row>
)
  }

export default Job

//questo componente riempie i campi degli annunci di lavoro in base alla ricerca effettuata. accanto ad ogni annuncio sarà presente una stellina per aggiungere o togliere l'annuncio dai preferiti. se l'annuncio è nei preferiti la stellina sarà interamente colorata altrimenti sarà 'vuota'
