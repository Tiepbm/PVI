import React, { useState }  from "react";
import { Document, Page } from 'react-pdf';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import {useParams} from "react-router-dom";
import { pdfjs } from 'react-pdf';
import lodash from "lodash";
import MainLayout from "../../components/Layout";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
function RuleProductDetail(){
    let {productId} = useParams();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
    }

    return (
        // <MainLayout title={'Quy tắc sản phẩm'}>
            <div className={'main-content'}>
            <Document options={{
                cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                cMapPacked: true,
            }}  file={productId==='nhaotoandien'?'./pdf/nhaotoandien.pdf':productId==='tainansudungdien'?'./pdf/tainansudungdien.pdf':'./pdf/tndsoto.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page renderMode={"canvas"} className={'margin-right-auto margin-left-auto'} key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
        // </MainLayout>
    );
}
export default RuleProductDetail;
