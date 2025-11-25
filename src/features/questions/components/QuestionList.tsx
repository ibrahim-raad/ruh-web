import { useState } from "react";
import { Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import {
  useCreateQuestion,
  useQuestions,
  useUpdateQuestion,
} from "../api/useQuestions";
import { QuestionCard } from "./QuestionCard";
import { QuestionForm } from "./QuestionForm";
import type { Question } from "../types/question.types";

interface QuestionListProps {
  questionnaireId: string;
}

function SortableQuestionItem({
  question,
  index,
}: {
  question: Question;
  index: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: "relative" as const,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.stopPropagation();
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div onKeyDown={handleKeyDown}>
        <QuestionCard question={question} index={index} />
      </div>
    </div>
  );
}

export function QuestionList({ questionnaireId }: QuestionListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { data, isLoading } = useQuestions({
    questionnaire_id: questionnaireId,
    sort: "order asc",
  });

  const createMutation = useCreateQuestion({
    onSuccess: () => setIsAdding(false),
  });

  const updateMutation = useUpdateQuestion();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  const questions = data?.data || [];

  const nextIndex =
    questions.length > 0
      ? Math.max(...questions.map((q: Question) => q.order)) + 1
      : 1;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex((q: Question) => q.id === active.id);
      const newIndex = questions.findIndex((q: Question) => q.id === over.id);

      const newQuestions = arrayMove(questions, oldIndex, newIndex);

      // Calculate new order
      const prevItem = newQuestions[newIndex - 1];
      const nextItem = newQuestions[newIndex + 1];

      let newOrder: number;

      if (!prevItem) {
        // Moved to start
        if (nextItem?.order === 0) {
          newOrder = -1;
        } else if (nextItem?.order < 0) {
          newOrder = nextItem.order * 2;
        } else {
          newOrder = nextItem.order / 2;
        }
      } else if (!nextItem) {
        newOrder = prevItem.order + 1;
      } else {
        newOrder = (prevItem.order + nextItem.order) / 2;
      }

      const activeQuestion = questions.find(
        (q: Question) => q.id === active.id
      );

      if (activeQuestion && activeQuestion.order !== newOrder) {
        updateMutation.mutate({
          id: activeQuestion.id,
          data: {
            version: activeQuestion.version,
            order: newOrder,
          },
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions.map((q: Question) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {questions.map((question: Question, index: number) => (
              <SortableQuestionItem
                key={question.id}
                question={question}
                index={index}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isAdding ? (
        <QuestionForm
          questionnaireId={questionnaireId}
          nextIndex={nextIndex}
          onSubmit={(data) => createMutation.mutate(data)}
          onCancel={() => setIsAdding(false)}
          isLoading={createMutation.isPending}
        />
      ) : (
        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      )}
    </div>
  );
}
