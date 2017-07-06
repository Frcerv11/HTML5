import React, { Component } from 'react';

const EditModeInput = ({value,name,handleChange,index}) => {
  return (
    <input type="text" name={name}  defaultValue={value}  onChange={(e) => {handleChange(e,name,index)}}  />

  )
}

const Labels = ({data}) =>{
  return(
    
      <tr>
          <th>Options</th>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>ID</th>
          <th>Featured</th>
        
      </tr>

  )
  
}
const Item = ({data, remove, _editInfo, index, toggleClass, handleChange}) => {
  // Each data
  return (  
   
    
      <tr className={data.active ? 'check': null}>
        <td>
          <button onClick={() => {remove(index)}}>Remove</button>
          <button onClick={() => {toggleClass(index)}}>Featured</button>
          <button onClick={() => {_editInfo(index)}} > {data.edit ? "Save" : "Edit" }</button>
        </td>         
        <td>{(data.edit) ? <EditModeInput index={index} handleChange={handleChange} name={"title"} value={data.title}></EditModeInput> : <span>{data.title}</span>    } </td> 
        <td>{(data.edit) ? <EditModeInput index={index} handleChange={handleChange} name={"author"} value={data.author}></EditModeInput> :  <span>{data.author}</span> }</td>
        <td>{(data.edit) ? <EditModeInput index={index} handleChange={handleChange} name={"description"} value={data.description}></EditModeInput> : <span>{data.description}</span>  }</td>
        <td>{data.id} </td>
        <td><input type="checkbox" name="vehicle"   checked={data.active} /></td>
      </tr>
    
  );
}

export const EditComic = ({data, remove, _editInfo, toggleClass,handleChange}) => {

  // Map through the data
  const itemNode = Object.keys(data).map((key,i) => {
    // console.log(data[key])
    return  (
      <Item  key={key} toggleClass={toggleClass} index={key} remove={remove} data={data[key]}  _editInfo={_editInfo} handleChange={handleChange} />
    ) 
  })

  return (
    <table>
      <thead>
        <Labels data={data}/>
      </thead>
      <tbody>
        {itemNode}
      </tbody>
    </table>
  );
}
