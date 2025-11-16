import '@testing-library/jest-dom';
import React from 'react';
import { Loader } from "../Loader"
import {render, screen} from '@testing-library/react';

describe('Loader',()=>{
    it('se muestra el Loader', ()=>{
        const loading = true;

        render(<Loader loading={loading}/>)

        const textoLoader = screen.getByText('Hello Loader')
        expect(textoLoader).toBeVisible();

    });


    it('el Loader pasa de true a false', ()=>{
        const loading = true;

        render(<Loader loading={loading}/>)

        

    })
})