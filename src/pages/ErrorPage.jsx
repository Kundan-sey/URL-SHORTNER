import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {  UserCircle } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Error Page</CardTitle>
          <CardDescription>No Short URL Found!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Sorry, the page you are looking for does not exist. It might have been removed or you might have entered an incorrect URL.</p>
        </CardContent>
        <CardFooter>
          <Button className="border-2 mx-auto hover:bg-red-400  border-red-400" variant="Destructive" onClick={handleNavigate}><UserCircle/>Go to Dashboard</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
