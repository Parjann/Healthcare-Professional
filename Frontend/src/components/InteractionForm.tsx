import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm } from '../store/interactionSlice';
import { RootState, AppDispatch } from '../store';
import { FileText } from 'lucide-react';

const InteractionForm: React.FC = () => {
  const form = useSelector((state: RootState) => state.interaction.form);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  };

  const inputClass = "w-full p-3 glass-input rounded-xl focus:outline-none transition-all duration-300 placeholder-slate-500";
  const labelClass = "block text-sm font-semibold text-slate-300 mb-1.5 ml-1";

  return (
    <div className="glass-panel p-6 rounded-3xl h-full flex flex-col overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8 shrink-0 relative z-10">
        <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <FileText className="text-indigo-400" size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-100">Interaction Details</h2>
      </div>

      <div className="space-y-5 flex-1 flex flex-col overflow-y-auto pr-3 relative z-10 custom-scrollbar">

        <div>
          <label className={labelClass}>HCP Name</label>
          <input type="text" name="hcp_name" value={form.hcp_name} onChange={handleChange} className={inputClass} placeholder="e.g. Dr. Sharma" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Topics</label>
          <input type="text" name="topics" value={form.topics} onChange={handleChange} className={inputClass} placeholder="e.g. Oncology Drug" />
        </div>

        <div>
          <label className={labelClass}>Sentiment</label>
          <select name="sentiment" value={form.sentiment} onChange={handleChange} className={`${inputClass} appearance-none`}>
            <option value="Positive" className="bg-slate-800 text-slate-100">Positive</option>
            <option value="Neutral" className="bg-slate-800 text-slate-100">Neutral</option>
            <option value="Negative" className="bg-slate-800 text-slate-100">Negative</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Materials Provided</label>
          <input type="text" name="materials" value={form.materials} onChange={handleChange} className={inputClass} placeholder="e.g. Brochures, Samples" />
        </div>

        <div>
          <label className={labelClass}>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Interaction summary..."></textarea>
        </div>

        <div className="flex-1 flex flex-col min-h-[140px]">
          <label className={labelClass}>Follow Up Plan</label>
          <textarea name="follow_up" value={form.follow_up} onChange={handleChange} className={`${inputClass} flex-1 resize-none`} placeholder="Next steps..."></textarea>
        </div>
      </div>
    </div>
  );
};

export default InteractionForm;
