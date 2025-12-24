import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { roadmapService } from '../api';
import LoadingScreen from '../Components/Roadmap/LoadingScreen';
import RoadmapDisplay from '../Components/Roadmap/RoadmapDisplay';

const RoadmapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await roadmapService.getRoadmap(id);
        if (resp?.success && resp.roadmap) {
          // resp.roadmap is the DB row; resp.roadmap.roadmap is the stored JSON
          const row = resp.roadmap;
          const data = row?.roadmap;
          if (data) {
            setRoadmap({ id: row.id, ...data });
          } else {
            toast.error('Invalid roadmap format');
            navigate('/saved-roadmaps');
          }
        } else {
          toast.error(resp?.error || 'Failed to load roadmap');
          navigate('/saved-roadmaps');
        }
      } catch (e) {
        toast.error(e?.message || 'Failed to load roadmap');
        navigate('/saved-roadmaps');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleUpdateProgress = async (updatedRoadmap) => {
    setRoadmap(updatedRoadmap);
    try {
      if (updatedRoadmap?.id) {
        await roadmapService.updateRoadmapProgress(updatedRoadmap.id, updatedRoadmap);
      }
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  };

  if (loading) {
    return <LoadingScreen company={roadmap?.company || 'Roadmap'} />;
  }

  if (!roadmap || !roadmap.roadmap || !Array.isArray(roadmap.roadmap)) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <h3 className="text-xl font-bold text-red-800 mb-4">Error: Invalid Roadmap Data</h3>
          <p className="text-red-600 mb-6">Unable to display this roadmap.</p>
          <button
            onClick={() => navigate('/saved-roadmaps')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Back to Saved Roadmaps
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <RoadmapDisplay
        roadmap={roadmap}
        onSave={null}
        onGenerateNew={() => navigate('/companies')}
        onUpdateProgress={handleUpdateProgress}
      />
    </div>
  );
};

export default RoadmapView;
