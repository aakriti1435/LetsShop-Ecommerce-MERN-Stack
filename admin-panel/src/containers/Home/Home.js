import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';

function Home() {
    return (
        <Layout>
            <Jumbotron className="text-center" style={{ margin: '2rem' }} >
                <h1>Welcome to ADMIN Dashboard</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, laborum totam ut quidem distinctio quaerat ex magni fuga enim nihil impedit doloribus ea reprehenderit cum id saepe molestias voluptatem vitae?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, laborum totam ut quidem distinctio quaerat ex magni fuga enim nihil impedit doloribus ea reprehenderit cum id saepe molestias voluptatem vitae?
                </p>
            </Jumbotron>
        </Layout>
    )
}

export default Home;
