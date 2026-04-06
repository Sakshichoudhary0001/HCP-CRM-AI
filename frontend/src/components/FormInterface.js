import React, { useState } from 'react';
import styles from './FormInterface.module.css';

const FormInterface = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    hcp_name: '',
    specialty: '',
    interaction_type: 'meeting',
    date: new Date().toISOString().split('T')[0],
    duration_minutes: 30,
    discussion_points: [],
    products_discussed: [],
    notes: '',
    outcome: 'positive',
  });

  const [discussionInput, setDiscussionInput] = useState('');
  const [productInput, setProductInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addDiscussionPoint = () => {
    if (discussionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        discussion_points: [...prev.discussion_points, discussionInput]
      }));
      setDiscussionInput('');
    }
  };

  const removeDiscussionPoint = (index) => {
    setFormData(prev => ({
      ...prev,
      discussion_points: prev.discussion_points.filter((_, i) => i !== index)
    }));
  };

  const addProduct = () => {
    if (productInput.trim()) {
      setFormData(prev => ({
        ...prev,
        products_discussed: [...prev.products_discussed, productInput]
      }));
      setProductInput('');
    }
  };

  const removeProduct = (index) => {
    setFormData(prev => ({
      ...prev,
      products_discussed: prev.products_discussed.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <h2>HCP Interaction Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>HCP Information</legend>
          <div className={styles.formGroup}>
            <label>HCP Name *</label>
            <input
              type="text"
              name="hcp_name"
              value={formData.hcp_name}
              onChange={handleInputChange}
              required
              placeholder="Enter HCP name"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Specialty *</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              required
              placeholder="e.g., Cardiology, Neurology"
            />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Interaction Details</legend>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Interaction Type *</label>
              <select
                name="interaction_type"
                value={formData.interaction_type}
                onChange={handleInputChange}
                required
              >
                <option value="meeting">Meeting</option>
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="conference">Conference</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Discussion Points</legend>
          <div className={styles.listManager}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addDiscussionPoint()}
                placeholder="Add discussion point"
              />
              <button type="button" onClick={addDiscussionPoint}>Add</button>
            </div>
            <div className={styles.listContainer}>
              {formData.discussion_points.map((point, idx) => (
                <div key={idx} className={styles.listItem}>
                  <span>{point}</span>
                  <button type="button" onClick={() => removeDiscussionPoint(idx)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Products Discussed</legend>
          <div className={styles.listManager}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addProduct()}
                placeholder="Add product"
              />
              <button type="button" onClick={addProduct}>Add</button>
            </div>
            <div className={styles.listContainer}>
              {formData.products_discussed.map((product, idx) => (
                <div key={idx} className={styles.listItem}>
                  <span>{product}</span>
                  <button type="button" onClick={() => removeProduct(idx)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Additional Information</legend>
          <div className={styles.formGroup}>
            <label>Outcome *</label>
            <select
              name="outcome"
              value={formData.outcome}
              onChange={handleInputChange}
              required
            >
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional notes about the interaction"
              rows="5"
            />
          </div>
        </fieldset>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Submitting...' : 'Log Interaction'}
        </button>
      </form>
    </div>
  );
};

export default FormInterface;
