import { Table, Modal, Button, Pagination } from 'antd';

const ReportModal = ({handleCancel, downloadReports, selectedErrorType, selectedDate, autoCorrectiondata, isModalOpen, onchangePagination, columns, pageNumberCount}:{handleCancel:any, downloadReports:any, selectedErrorType:any, selectedDate:any, autoCorrectiondata:any, isModalOpen:any, onchangePagination:any, columns:any, pageNumberCount:any}) => {
    return <Modal
        className="autocorrection-modal"
        title={selectedErrorType}
        open={isModalOpen}
        onCancel={() => handleCancel()}
        footer={null}>
        <div style={{ display: "flex", justifyContent: "end", marginBottom: '20px' }}>
            {selectedErrorType === 'Auto Corrections' ? 
            <Button type='default' onClick={() => downloadReports(selectedDate, 'Auto Corrections')}>Download Auto-Corrections Reports</Button> : 
            selectedErrorType === 'Pre Invoice Error Count' ? <Button type='default' onClick={() => downloadReports(selectedDate, 'Pre Invoice Error Count')}>Download Pre Invoice Error Count</Button> :
                <Button type='default' onClick={() => downloadReports(selectedDate, 'Post Invoice Error Count')}>Download Post Invoice Error Count</Button>}</div>
        <Table
            bordered
            dataSource={selectedErrorType === 'Auto Corrections' ? autoCorrectiondata?.autoCorrectionData : selectedErrorType === 'Pre Invoice Error Count' ? autoCorrectiondata?.preInvoiceError : autoCorrectiondata?.postInvoiceError}
            columns={columns} 
            className='autocorrection-table'
             pagination={false} />
        <Pagination defaultCurrent={pageNumberCount} onChange={onchangePagination} total={autoCorrectiondata?.totalRecords} style={{ marginTop: '30px' }} />
    </Modal>
}

export default ReportModal;