import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import TarefaService from '@/services/tarefaService';

interface TarefaData {
    titulo: string;
    descricao: string;
    data: string;
    prioridade: string;
    status: string;
}

const Registrar = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [itemData, setItemData] = useState<TarefaData | null>(null);
    const [formData, setFormData] = useState<TarefaData>({
        titulo: '',
        descricao: '',
        data: '',
        prioridade: '',
        status: '',
    });

    useEffect(() => {
        console.log(itemId);
        TarefaService.getTarefa(itemId).then((data: TarefaData) => {
            setItemData(data);
            setFormData(data);
        }).catch();
    }, [itemId]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        TarefaService.updateTarefa(itemId, formData).then((data) => {
            console.log('Tarefa adicionada:');
            if (data === 204) {
                navigate('/listar');
            }
            setFormData({
                titulo: '',
                descricao: '',
                data: '',
                prioridade: '',
                status: '',
            });
        }).catch((error: { data: any; }) => {
            console.log('Erro ao adicionar o tarefa:', error);
        });
    }

    if (!itemData) {
        return (
            <h4>Carregando</h4>
        );
    }

    return (
        <div className={"formulario"}>
            <h2>Atualizar Tarefa</h2>
            <Form onSubmit={handleSubmit} className={"formulario"}>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Título"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Descrição"
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Data"
                                id="data"
                                name="data"
                                value={formData.data}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Prioridade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Prioridade"
                                id="prioridade"
                                name="prioridade"
                                value={formData.prioridade}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Status"
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="buttons">
                        <Button type="submit">Registrar</Button>
                        <Button onClick={() => navigate('/')}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Registrar;
