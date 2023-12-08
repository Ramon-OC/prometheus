import { CSmartTable } from '@coreui/react-pro';
import { CCard, CCardBody } from '@coreui/react';
import { Button, Row, Col } from 'react-bootstrap';

const DataTable = ({ handleModalShow, showLoading, items, columns, scopedColumns, title }) => {
  return (
    <>
      <Row>
        <Col md={8} className="d-flex align-items-cneter">
          <h2>{title}</h2>
        </Col>
        { handleModalShow && (<Col md={4} className="d-flex align-items-center">
          <Button variant="primary" size="lg" className="w-100" onClick={handleModalShow}>Agregar</Button>
        </Col>)}
      </Row>
  
      <Row className="mt-3">
        <Col md={12}>
          <CCard>
            <CCardBody>
              <CSmartTable
                loading={showLoading}
                items={items}
                columns={columns}
                tableFilter
                itemsPerPageSelect
                itemsPerPage={5}
                scopedColumns={scopedColumns}
              />
            </CCardBody>
          </CCard>
        </Col>
      </Row>
    </>
  )
};

export default DataTable;
