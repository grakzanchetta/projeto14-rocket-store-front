import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Cart() {
    return (
        <Container>
            <Link to='/checkout'>Ir para check-out </Link>
        </Container>
    )
}

const Container = styled.div`
`