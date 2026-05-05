import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm } from '../store/interactionSlice';
import { RootState, AppDispatch } from '../store';

const InteractionForm: React.FC = () => {
  const form = useSelector((state: RootState) => state.interaction.form);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Interaction Details</h2>
      <div className="space-y-4 flex-1 overflow-y-auto pr-2">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">HCP Name</label>
          <input type="text" name="hcp_name" value={form.hcp_name} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="e.g. Dr. Sharma" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
          <input type="text" name="topics" value={form.topics} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="e.g. Oncology Drug" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sentiment</label>
          <select name="sentiment" value={form.sentiment} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none">
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Materials Provided</label>
          <input type="text" name="materials" value={form.materials} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="e.g. Brochures, Samples" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="Interaction summary..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Follow Up Plan</label>
          <textarea name="follow_up" value={form.follow_up} onChange={handleChange} rows={2} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="Next steps..."></textarea>
        </div>
      </div>
    </div>
  );
};

export default InteractionForm;
