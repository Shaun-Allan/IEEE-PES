import React, { useState, useEffect } from 'react';
import './EditTeam.css';
import { collection, getDocs, query, where, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../../utils/DatabaseServices/FirebaseConfig.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { deleteObject} from 'firebase/storage'

const EditTeam = () => {
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    year: '',
    image: '',
  });
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState(['Design', 'Technical', 'Office Bearers', 'Vertical', 'Event Management','PR']);
  const [selectedCategory, setSelectedCategory] = useState('Design'); // Default category for adding
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    if (viewData && viewData.Image && viewData.category) {
      fetchImageUrl(viewData.category, viewData.Image);
    }
  }, [viewData]);

  const fetchImageUrl = async (category, imageName) => {
    try {
      const imagePath = `Team/${category}/${imageName}`;
      const imageRef = ref(storage, imagePath);
      const url = await getDownloadURL(imageRef);
      setViewData((prev) => ({ ...prev, Image: url }));
    } catch (error) {
      console.error('Error fetching image URL:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleActionClick = (actionType) => {
    setAction(actionType);
    setError('');
    setViewData(null);
    setFormData({
      name: '',
      role: '',
      department: '',
      year: '',
      image: '',
    });
    if (actionType === 'REMOVE') {
      setConfirmation(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileName = `${Date.now()}_${file.name}`;
        const imagePath = `Team/${selectedCategory}/${fileName}`;
        const imageRef = ref(storage, imagePath);
        await uploadBytes(imageRef, file);

        const url = await getDownloadURL(imageRef);
        setFormData((prev) => ({ ...prev, image: url }));
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Error uploading image. Please try again.');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (action === 'VIEW' || action === 'EDIT') {
      if (!formData.name || !selectedCategory) {
        setError('Name and Category must be provided');
        return;
      }
  
      try {
        setLoading(true);
        const categoryCollection = collection(db, `Team/Team Members/${selectedCategory}`);
        const q = query(categoryCollection, where('Name', '==', formData.name));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const firstMatch = querySnapshot.docs[0];
          setViewData({ id: firstMatch.id, ...firstMatch.data(), category: selectedCategory });
          setFormData({
            name: firstMatch.data().Name,
            role: firstMatch.data().Role,
            department: firstMatch.data().Dept,
            year: firstMatch.data().Year,
            image: firstMatch.data().Image,
          });
        } else {
          setError('No details found.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    } else if (action === 'EDIT' && viewData) {
      if (!formData.name || !formData.role || !formData.department || !formData.year) {
        setError('All fields must be provided');
        return;
      }
  
      try {
        setLoading(true);
        const docRef = doc(db, `Team/Team Members/${viewData.category}`, viewData.id);
  
        console.log('Updating document:', docRef.id);
        console.log('Data to update:', {
          Name: formData.name,
          Role: formData.role,
          Dept: formData.department,
          Year: formData.year,
          Image: formData.image,
        });
  
        await updateDoc(docRef, {
          Name: formData.name,
          Role: formData.role,
          Dept: formData.department,
          Year: formData.year,
          Image: formData.image,
        });
  
        alert('Team member details updated successfully!');
        setError('');
        setAction('');
        setFormData({
          name: '',
          role: '',
          department: '',
          year: '',
          image: '',
        });
        setViewData(null);
        navigate('/home'); // Navigate to home screen
      } catch (err) {
        console.error('Error updating data:', err);
        setError('Error updating data. Please try again.');
      } finally {
        setLoading(false);
      }
    } else if (action === 'ADD') {
      if (!formData.name || !formData.role || !formData.department || !formData.year || !formData.image) {
        setError('All fields must be provided');
        return;
      }
  
      try {
        setLoading(true);
  
        const categoryCollection = collection(db, `Team/Team Members/${selectedCategory}`);
  
        await addDoc(categoryCollection, {
          Name: formData.name,
          Role: formData.role,
          Dept: formData.department,
          Year: formData.year,
          Image: formData.image,
        });
  
        alert('Team member added successfully!');
        setError('');
        setAction('');
        setFormData({
          name: '',
          role: '',
          department: '',
          year: '',
          image: '',
        });
        setViewData(null);
      } catch (err) {
        console.error('Error adding data:', err);
        setError('Error adding data. Please try again.');
      } finally {
        setLoading(false);
      }
    } else if (action === 'REMOVE') {
      if (!formData.name || !selectedCategory) {
        setError('Name and Category must be provided');
        return;
      }
  
      if (!confirmation) {
        try {
          setLoading(true);
          const categoryCollection = collection(db, `Team/Team Members/${selectedCategory}`);
          const q = query(categoryCollection, where('Name', '==', formData.name));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            const firstMatch = querySnapshot.docs[0];
            setViewData({ id: firstMatch.id, ...firstMatch.data(), category: selectedCategory });
          } else {
            setError('No matching team member found.');
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Error fetching data. Please try again.');
        } finally {
          setLoading(false);
        }
        setConfirmation(true);
        return;
      }
  
      try {
        setLoading(true);
        const categoryCollection = collection(db, `Team/Team Members/${selectedCategory}`);
        const q = query(categoryCollection, where('Name', '==', formData.name));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;
            const data = doc.data();
  
            await deleteDoc(docRef);
  
            if (data.Image) {
              const imagePath = `Team/${selectedCategory}/${data.Image}`;
              const imageRef = ref(storage, imagePath);
              try {
                await deleteObject(imageRef);
                console.log('Image deleted successfully!');
              } catch (err) {
                console.error('Error deleting image:', err);
              }
            }
          });
          alert('Team member removed successfully!');
        } else {
          setError('No matching team member found.');
        }
  
        setError('');
        setAction('');
        setFormData({
          name: '',
          role: '',
          department: '',
          year: '',
          image: '',
        });
        setViewData(null);
        navigate('/home'); // Navigate to home screen
      } catch (err) {
        console.error('Error removing data:', err);
        setError('Error removing data. Please try again.');
      } finally {
        setLoading(false);
        setConfirmation(false);
      }
    }
  };
  
  

  return (
    <div className="edit-team">
      <div className="buttons">
        <button onClick={() => handleActionClick('ADD')}>ADD</button>
        <button onClick={() => handleActionClick('EDIT')}>EDIT</button>
        <button onClick={() => handleActionClick('REMOVE')}>REMOVE</button>
        <button onClick={() => handleActionClick('VIEW')}>VIEW</button>
      </div>
  
      {action && (
        <form onSubmit={handleFormSubmit} className="form">
          <div className="form-fields">
            {(action === 'REMOVE' || action === 'VIEW'|| action === 'EDIT') && (
              <>
                <div className="form-row">
                  <label>Category:</label>
                  <select value={selectedCategory} onChange={handleCategoryChange}>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                  />
                </div>
              </>
            )}
            {(action === 'ADD') && (
              <>
                <div className="form-row">
                  <label>Category:</label>
                  <select value={selectedCategory} onChange={handleCategoryChange}>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-row">
                  <label>Role:</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Enter Role"
                  />
                </div>
                <div className="form-row">
                  <label>Department:</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Enter Department"
                  />
                </div>
                <div className="form-row">
                  <label>Year:</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Enter Year"
                  />
                </div>
                <div className="form-row">
                  <label>Image:</label>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              </>
            )}
          </div>
  
          {action === 'REMOVE' && confirmation && viewData && (
            <div className="confirm-message">
              <p>Are you sure you want to remove the following details?</p>
              <p><strong>Category:</strong> {viewData.category}</p>
              <p><strong>Name:</strong> {viewData.Name}</p>
              <p><strong>Role:</strong> {viewData.Role}</p>
              <p><strong>Department:</strong> {viewData.Dept}</p>
              <p><strong>Year:</strong> {viewData.Year}</p>
              {viewData.Image && <img src={viewData.Image} alt="Team member" />}
            </div>
          )}
          {action === 'VIEW' && viewData && (
            <div className="Details:">
              <p><strong>Category:</strong> {viewData.category}</p>
              <p><strong>Name:</strong> {viewData.Name}</p>
              <p><strong>Role:</strong> {viewData.Role}</p>
              <p><strong>Department:</strong> {viewData.Dept}</p>
              <p><strong>Year:</strong> {viewData.Year}</p>
              {viewData.Image && <img src={viewData.Image} alt="Team member" />}
            </div>
          )}
          {action === 'EDIT' && viewData && (
            
  <div className="form-fields">
    <p>EDIT DETAILS BELOW</p>
    <div className="form-row">
      <label>Category:</label>
      <select value={selectedCategory} onChange={handleCategoryChange} disabled>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
    <div className="form-row">
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter Name"
      />
    </div>
    <div className="form-row">
      <label>Role:</label>
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleInputChange}
        placeholder="Enter Role"
      />
    </div>
    <div className="form-row">
      <label>Department:</label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleInputChange}
        placeholder="Enter Department"
      />
    </div>
    <div className="form-row">
      <label>Year:</label>
      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleInputChange}
        placeholder="Enter Year"
      />
    </div>
    <div className="form-row">
      <label>Image:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {formData.image && <img src={formData.image} alt="Team member" style={{ width: '100px', height: '100px' }} />}
    </div>
  </div>
)}
  
          <button type="submit">
            {action === 'REMOVE' && confirmation ? 'Confirm Remove' : 'Submit'}
          </button>
  
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
}
export default EditTeam;
