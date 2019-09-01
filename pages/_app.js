import App, { Container } from 'next/app'
import Page from '../components/Page'

class Wrapper extends App {
    render() {
        const { Component } = this.props

        return (
            <Container>
                <Page>
                    <Component></Component>
                </Page>
            </Container>
        )
    }
}

export default Wrapper