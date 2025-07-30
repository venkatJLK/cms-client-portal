
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AppLayout } from '../components/appLayout/AppLayout';
import AppointmentContainer from '../components/appointment/AppointmentContainer';
import ProfileContainer from '../components/profile/ProfileContainer';
import ReportContainer from '../components/reports/ReportContainer';
import DoctorProfile from '../components/doctors/DoctorProfile';
import ProtectedRoute from './ProtectedRoute';
import LoginComponent from '../components/authPages/LoginComponent';
import AddEditAppointment from '../components/appointment/AddEditAppointment';

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginComponent />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="/profile" replace /> },
            { path: 'profile', element: <ProfileContainer /> },
            { path: 'report', element: <ReportContainer /> },
            { path: 'appointments', element: <AppointmentContainer /> },
            { path: 'doctor', element: <DoctorProfile /> },
            { path: 'appointments/schedule', element: <AddEditAppointment /> },
        ],
    },
];

export default routes;
